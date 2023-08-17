import { IsBoolean, IsString } from 'class-validator';

export class AgentRequest {
    @IsString()
    agentId: string;

    @IsBoolean()
    caseRead: boolean;

    @IsBoolean()
    caseWrite: boolean;

    @IsBoolean()
    agentWrite: boolean;
}
