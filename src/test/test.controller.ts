import { Body, Controller, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('create')
  async createTest(@Body() body: any) {
    try {
      const resp = await this.testService.createTest({
        subjectId: new Types.ObjectId(),
        questions: body.questions,
        number: body.number,
      });
      return {
        data: resp,
        code: 201,
        error: null,
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
        data: null,
        code: 400,
        error: error,
        message: error.message || 'something went wrong',
      };
    }
  }
}
