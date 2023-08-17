import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ReturnRequest } from './dtos/return-request.dto';
import { Case, CaseDbService } from '@app/case-db';
import { AgentDbService } from '@app/agent-db';

@Injectable()
export class GuestService {
    constructor(private readonly caseDb: CaseDbService, private readonly agentDb: AgentDbService) {}

    public async createCase(returnRequest: ReturnRequest, customerId: string): Promise<Case> {
        const unassignedAgent = await this.agentDb.findUnassigned();

        const ticket = await this.caseDb.create({
            ...returnRequest,
            customerId,
            agentId: unassignedAgent?.agentId,
        });

        if (ticket.agentId) {
            await this.agentDb.assignAgent(ticket._id, ticket.agentId);
        }
        return ticket;
    }
}
