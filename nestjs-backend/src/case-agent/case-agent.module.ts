import { Module } from '@nestjs/common';
import { CaseAgentController } from './case-agent.controller';
import { CaseAgentService } from './case-agent.service';
import { CaseDbModule } from '@app/case-db';
import { AgentDbModule } from '@app/agent-db';

@Module({
    imports: [CaseDbModule, AgentDbModule],
    controllers: [CaseAgentController],
    providers: [CaseAgentService],
})
export class CaseAgentModule {}
