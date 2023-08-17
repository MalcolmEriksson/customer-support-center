import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Case, CaseState, CreateCaseDto } from './dtos';
import { Model } from 'mongoose';

@Injectable()
export class CaseDbService {
    constructor(@InjectModel(Case.name) private caseModel: Model<Case>) {}

    async create(createCaseDto: CreateCaseDto): Promise<Case> {
        const newCase = new this.caseModel({
            ...createCaseDto,
            creationDate: Date.now(),
            state: CaseState.OPEN,
        });
        return newCase.save();
    }

    async listActive(): Promise<Case[]> {
        return this.caseModel.find({ state: CaseState.OPEN }).exec();
    }

    async findActiveAndUnassigned(): Promise<Case> {
        return this.caseModel.findOne({ state: CaseState.OPEN, agentId: undefined }).exec();
    }

    async resolveCase(caseId: string): Promise<Case> {
        return this.caseModel.findOneAndUpdate({ _id: caseId }, { state: CaseState.CLOSED });
    }

    async assignCase(caseId: string, agentId: string): Promise<Case> {
        return this.caseModel.findOneAndUpdate({ _id: caseId }, { agentId }).exec();
    }
}
