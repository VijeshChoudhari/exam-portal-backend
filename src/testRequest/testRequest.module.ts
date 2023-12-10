import { MongooseModule } from '@nestjs/mongoose';
import { TestRequest, TestRequestSchema } from './entities/testRequest.entites';
import { TestRequestController } from './testRequest.controller';
import { TestRequestService } from './testRequest.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestRequest.name, schema: TestRequestSchema },
    ]),
  ],
  controllers: [TestRequestController],
  providers: [TestRequestService],
})
export class TestRequestModule {}
