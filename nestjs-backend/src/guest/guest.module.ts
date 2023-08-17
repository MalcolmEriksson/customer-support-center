import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { CaseDbModule } from '@app/case-db';
import { AgentDbModule } from '@app/agent-db';

@Module({
    imports: [CaseDbModule, AgentDbModule],
    controllers: [GuestController],
    providers: [GuestService],
})
export class GuestModule {}
