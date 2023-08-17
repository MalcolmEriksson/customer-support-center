import { Module } from '@nestjs/common';
import { CaseDbService } from './case-db.service';
import { Case, CaseSchema } from './dtos';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }])],
  providers: [CaseDbService],
  exports: [CaseDbService],
})
export class CaseDbModule {}
