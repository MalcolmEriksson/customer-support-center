import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { OfficeAgentService } from './office-agent.service';
import { AgentRequest } from './dtos/agent-request.dto';
import * as jwt from 'jsonwebtoken';

@Controller('office-agent')
export class OfficeAgentController {
    constructor(private readonly agentService: OfficeAgentService) {}

    @Post(['add'])
    @UsePipes(new ValidationPipe({ transform: true }))
    addAgent(@Body() agentRequest: AgentRequest, @Headers('Authorization') authHeader?: string) {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return this.agentService.create(agentRequest, decodedJwt.partyUid);
    }

    @Delete(['remove/:id'])
    removeAgent(@Param('id') agentId: string, @Headers('Authorization') authHeader?: string) {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return this.agentService.remove(agentId, decodedJwt.partyUid);
    }

    @Patch(['update'])
    @UsePipes(new ValidationPipe({ transform: true }))
    updateAgent(@Body() agentRequest: AgentRequest, @Headers('Authorization') authHeader?: string) {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return this.agentService.update(agentRequest, decodedJwt.partyUid);
    }

    @Get(['list'])
    listAgents(@Headers('Authorization') authHeader?: string) {
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException('No bearer token provided', 401);
        }
        const decodedJwt = jwt.decode(authHeader.slice('Bearer '.length)); // Ofc jwt.authorize(...) in real scenario
        if (!decodedJwt.partyUid) {
            throw new HttpException('Invalid auhtorization token', 401);
        }
        return this.agentService.listAgents(decodedJwt.partyUid);
    }
}
