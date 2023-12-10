import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('create')
  async createTest(@Body() body: any) {
    try {
      const resp = await this.testService.createTest({
        subjectId: new Types.ObjectId(body.subjectId),
        questions: body.questions,
        number: body.number,
        testDurationInHour: body.testDurationInHour,
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('list/:subjectId')
  async getAllTestOfSubject(@Param('subjectId') subjectId: string) {
    try {
      const resp = await this.testService.getTestsOfSubject(
        new Types.ObjectId(subjectId),
      );
      return {
        code: 200,
        data: resp,
        error: null,
        message: 'success',
      };
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'fetch all Test',
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

  @Get('test-questions/:testId')
  async testDetailByTestId(@Param('testId') testId: string) {
    try {
      let resp = await this.testService.getTestDetailByTestId(
        new Types.ObjectId(testId),
      );
      for (let i = 0; i < resp[0].questions.length; i++) {
        resp[0].questions[i] = {
          questionNo:
            resp[0].subject.questions[resp[0].questions[i]].questionNo,
          question: resp[0].subject.questions[resp[0].questions[i]].question,
          options: resp[0].subject.questions[resp[0].questions[i]].options,
        };
      }
      delete resp[0].subject;

      return {
        data: resp[0],
        code: 200,
        error: null,
        message: 'success',
      };
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'fetch all Test',
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
