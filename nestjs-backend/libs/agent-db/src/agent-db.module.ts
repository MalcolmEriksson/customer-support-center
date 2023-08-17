import { Module } from '@nestjs/common';
import { AgentDbService } from './agent-db.service';
import { Agent, AgentSchema } from './dtos';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }])],
    providers: [AgentDbService],
    exports: [AgentDbService],
})
export class AgentDbModule {}
