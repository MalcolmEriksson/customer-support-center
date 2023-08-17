import { AgentDbService } from '@app/agent-db';
import { Case, CaseDbService } from '@app/case-db';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CaseAgentService {
    constructor(private readonly caseDb: CaseDbService, private readonly agentDb: AgentDbService) {}

    public async listActiveCases(activeAgentId: string): Promise<Case[]> {
        const activeAgent = await this.agentDb.findAgent(activeAgentId);
        if (activeAgent?.caseRead) {
            return this.caseDb.listActive();
        } else {
            throw new HttpException(`Not sufficient access`, 403);
        }
    }

    public async resolveCase(caseId: string, activeAgentId: string): Promise<void> {
        const activeAgent = await this.agentDb.findAgent(activeAgentId);
        if (activeAgent?.caseWrite) {
            await this.caseDb.resolveCase(caseId);
            const unassignedAgent = await this.agentDb.unassignCase(caseId);
            const newCase = await this.caseDb.findActiveAndUnassigned();
            if (newCase) {
                await this.caseDb.assignCase(newCase._id, unassignedAgent.agentId);
                await this.agentDb.assignAgent(newCase._id, unassignedAgent.agentId);
            }
        } else {
            throw new HttpException(`Not sufficient access`, 403);
        }
    }
}
