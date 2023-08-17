import { Module } from '@nestjs/common';
import { GuestModule } from './guest/guest.module';
import { CaseAgentService } from './case-agent/case-agent.service';
import { CaseAgentController } from './case-agent/case-agent.controller';
import { CaseAgentModule } from './case-agent/case-agent.module';
import { OfficeAgentModule } from './office-agent/office-agent.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [GuestModule, CaseAgentModule, OfficeAgentModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {}
