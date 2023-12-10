import { MongooseModule } from '@nestjs/mongoose';
import { TestRequest, TestRequestSchema } from './entities/testRequest.entites';
import { TestRequestController } from './testRequest.controller';
import { TestRequestService } from './testRequest.service';
import { Module } from '@nestjs/common';
import { Report, ReportSchema } from 'src/Report/entities/report.entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestRequest.name, schema: TestRequestSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
  ],
  controllers: [TestRequestController],
  providers: [TestRequestService],
})
export class TestRequestModule {}
