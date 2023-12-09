import { ApiTags } from '@nestjs/swagger';
import { TestRequestService } from './testRequest.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Types } from 'mongoose';

@ApiTags('testRequest')
@Controller('testRequest')
export class TestRequestController {
  constructor(private readonly testRequestService: TestRequestService) {}

  @Post('create')
  async createTestRequest(@Body() body: any) {
    try {
      const resp = await this.testRequestService.createNewRequest(
        new Types.ObjectId(body.userId),
        new Types.ObjectId(body.subjectId),
      );
      return {
        data: resp,
        error: null,
        code: 200,
        message: 'success',
      };
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'create Test',
          error: error.message,
          message: 'final catch error',
        }),
      );

      return {
        error: error,
        message: error.message || 'something went wrong',
        data: null,
        code: 400,
      };
    }
  }

  @Post('update')
  async updateTestRequest(@Body() body: any) {
    try {
      const resp = await this.testRequestService.updateRequest(
        new Types.ObjectId(body.testId),
        body.data,
      );
      if (
        body.data.approvalPending === false &&
        body.data.approvalStatus === true
      ) {
      }
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'update TestRequest',
          error: error.message,
          message: 'final catch error',
        }),
      );

      return {
        error: error,
        message: error.message || 'something went wrong',
        data: null,
        code: 400,
      };
    }
  }
}
