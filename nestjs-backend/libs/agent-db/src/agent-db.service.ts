import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, Scope } from './dtos';
import { Model } from 'mongoose';
import { AgentRequest } from 'src/office-agent/dtos/agent-request.dto';

@Injectable()
export class AgentDbService {
    constructor(@InjectModel(Agent.name) private agentModel: Model<Agent>) {}

    async create(agentRequest: AgentRequest): Promise<Agent> {
        const newAgent = new this.agentModel(agentRequest);
        return newAgent.save();
    }

    async findAgent(agentId: string): Promise<Agent> {
        return this.agentModel.findOne({ agentId });
    }

    async delete(agentId: string): Promise<void> {
        await this.agentModel.findOneAndRemove({ agentId });
    }

    async updateAgentScope(agentRequest: AgentRequest): Promise<Agent> {
        return this.agentModel.findOneAndReplace({ agentId: agentRequest.agentId }, agentRequest);
    }

    async findUnassigned(): Promise<Agent> {
        return this.agentModel.findOne({ assignedCase: undefined }).exec();
    }

    async listAllAgents(): Promise<Agent[]> {
        return this.agentModel.find().exec();
    }

    async assignAgent(caseId: string, agentId: string): Promise<Agent> {
        return this.agentModel.findOneAndUpdate({ agentId }, { assignedCase: caseId });
    }

    async unassignCase(caseId: string): Promise<Agent> {
        return this.agentModel.findOneAndUpdate({ assignedCase: caseId }, { $unset: { assignedCase: '' } });
    }
}
