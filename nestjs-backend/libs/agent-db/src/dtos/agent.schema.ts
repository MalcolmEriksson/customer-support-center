import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Scope {
    @Prop()
    caseWrite: Boolean;

    @Prop()
    caseRead: Boolean;

    @Prop()
    agentWrite: Boolean;
}

@Schema()
export class Agent {
    @Prop({
        unique: true,
    })
    agentId: string;

    @Prop()
    assignedCase?: string;

    @Prop()
    caseWrite: Boolean;

    @Prop()
    caseRead: Boolean;

    @Prop()
    agentWrite: Boolean;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
export type AgentDocument = HydratedDocument<Agent>;

export const ScopeSchema = SchemaFactory.createForClass(Scope);
export type ScopeDocument = HydratedDocument<Scope>;
