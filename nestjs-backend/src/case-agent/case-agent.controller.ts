import { Controller, Get, Headers, HttpException, Param, Patch } from '@nestjs/common';
import { CaseAgentService } from './case-agent.service';
import { Case } from '@app/case-db';
import * as jwt from 'jsonwebtoken';

@Controller('case-agent')
export class CaseAgentController {
    constructor(private readonly caseAgentService: CaseAgentService) {}

    @Get(['/list-active'])
    async listActiveCases(@Headers('Authorization') authHeader?: string): Promise<Case[]> {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return await this.caseAgentService.listActiveCases(decodedJwt.partyUid);
    }

    @Patch(['/resolve/:id'])
    async resolveCase(@Param('id') caseId: string, @Headers('Authorization') authHeader?: string): Promise<void> {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return await this.caseAgentService.resolveCase(caseId, decodedJwt.partyUid);
    }
}
