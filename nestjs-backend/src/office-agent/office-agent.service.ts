import { HttpException, Injectable } from '@nestjs/common';
import { AgentRequest } from './dtos/agent-request.dto';
import { Agent, AgentDbService } from '@app/agent-db';

@Injectable()
export class OfficeAgentService {
    constructor(private readonly agentDb: AgentDbService) {}

    public async create(agentRequest: AgentRequest, activeAgentId: string): Promise<Agent> {
        const activeAgent = await this.agentDb.findAgent(activeAgentId);
        if (activeAgent?.agentWrite) {
            return this.agentDb.create(agentRequest);
        } else {
            throw new HttpException(`Not sufficient access`, 403);
        }
    }

    public async remove(removalId: string, activeAgentId: string): Promise<void> {
        const activeAgent = await this.agentDb.findAgent(activeAgentId);
        if (activeAgent?.agentWrite) {
            return this.agentDb.delete(removalId);
        } else {
            throw new HttpException(`Not sufficient access`, 403);
        }
    }

    public async update(agentRequest: AgentRequest, activeAgentId: string): Promise<Agent> {
        const activeAgent = await this.agentDb.findAgent(activeAgentId);
        if (activeAgent?.agentWrite) {
            return this.agentDb.updateAgentScope(agentRequest);
        } else {
            throw new HttpException(`Not sufficient access`, 403);
        }
    }

    public async listAgents(activeAgentId: string): Promise<Agent[]> {
        const activeAgent = await this.agentDb.findAgent(activeAgentId);
        if (activeAgent?.agentWrite) {
            return this.agentDb.listAllAgents();
        } else {
            throw new HttpException(`Not sufficient access`, 403);
        }
    }
}
