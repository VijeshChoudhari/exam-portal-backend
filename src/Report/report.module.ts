import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Report, ReportSchema } from './entities/report.entities';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

import { Subject, SubjectSchema } from 'src/subjects/entites/subject.entites';
import { User, UserSchema } from 'src/user/entities/user.entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
