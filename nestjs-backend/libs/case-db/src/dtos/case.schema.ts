import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  HydratedDocument, Schema as MongooseSchema , Model} from "mongoose";

export enum CaseState  {
   OPEN = 'OPEN',
   CLOSED= 'CLOSED'
}

@Schema()
export class Article {
    @Prop()
    id: string;

    @Prop()
    quantity: number;
}

@Schema()
export class Case {
    _id: string;

    @Prop()
    creationDate: Date;

    @Prop()
    agentId?: string;

    @Prop()
    customerId: string;

    @Prop(String)
    state: CaseState;

    // @Prop({type:[{ type: MongooseSchema.Types.ObjectId, ref: 'ArticleSchema'}    ]})
    // returns: Article[];
    // @Prop({type:{ type: MongooseSchema.Types.ObjectId, ref: 'Article'}})
    // returns: Article;

    @Prop()
    productId: string;

    @Prop()
    quantity: number;

    @Prop()
    orderId: string;
}

export class CreateCaseDto {
    customerId: string;

    agentId?: string;

    productId: string;

    // returns?: Article[];
    returns?: Article;

    quantity: number;

    orderId: string;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
export type CaseDocument = HydratedDocument<Case>;

export const ArticleSchema = SchemaFactory.createForClass(Article);
export type ArticleDocument = HydratedDocument<Article>;
