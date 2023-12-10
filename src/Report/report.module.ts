import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Report, ReportSchema } from './entities/report.entities';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

import { Subject, SubjectSchema } from 'src/subjects/entites/subject.entites';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
