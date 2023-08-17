import { Module } from '@nestjs/common';
import { OfficeAgentController } from './office-agent.controller';
import { OfficeAgentService } from './office-agent.service';
import { AgentDbModule } from '@app/agent-db';

@Module({
    imports: [AgentDbModule],
    controllers: [OfficeAgentController],
    providers: [OfficeAgentService],
})
export class OfficeAgentModule {}
