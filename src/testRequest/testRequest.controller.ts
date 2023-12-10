import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TestRequestService } from './testRequest.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { verify } from 'jsonwebtoken';
import constants from 'src/constant';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('testRequest')
@Controller('testRequest')
export class TestRequestController {
  constructor(private readonly testRequestService: TestRequestService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('create')
  async createTestRequest(@Body() body: any, @Req() req: any) {
    try {
      const subjectId = new Types.ObjectId(body.subjectId);
      const userId = new Types.ObjectId(req.payload.userId);
      const limitExceeded = await this.testRequestService.isValidForTest(
        userId,
        subjectId,
      );
      if (!limitExceeded) {
        throw new Error('Test limit exceeded');
      }
      const resp = await this.testRequestService.createNewRequest(
        userId,
        subjectId,
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

  //   @UseGuards(AuthGuard)
  //   @ApiBearerAuth('JWT')
  @Post('update')
  async updateTestRequest(@Body() body: any) {
    try {
      let approvalStatus = false;
      let testNumber = 0;
      const allTests = await this.testRequestService.getTestByTestRequestId(
        new Types.ObjectId(body.testRequestId),
      );
      if (body.status) {
        approvalStatus = true;
        if (allTests.length > 0) {
          testNumber = Math.floor(Math.random() * allTests[0].length) + 1;
        }
      }
      const resp = await this.testRequestService.updateRequest(
        new Types.ObjectId(body.testRequestId),
        {
          approvalStatus: approvalStatus,
          approvalPending: false,
          testNumber: testNumber,
        },
      );
      if (body.status) {
        this.testRequestService.sendApprovedTestLink(
          { email: allTests[0].user.email },
          body.testRequestId,
          body.subjectName,
        );
      } else {
        this.testRequestService.sendRejectedTestMail({
          email: allTests[0].user.email,
        });
      }
      return {
        data: resp,
        error: null,
        code: 200,
        message: body.status ? 'Approved' : 'Rejected',
      };
    } catch (error) {
      console.log(error);
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

  @Get('testRequest-info/:testId')
  async getTestRequestInfo(@Param('testId') testId: string) {
    try {
      const isLinkValid = await this.testRequestService.checkLinkValidation(
        new Types.ObjectId(testId),
      );
      if (!isLinkValid) {
        return {
          data: {
            expired: true,
          },
          error: null,
          message: 'success',
          code: 200,
        };
      } else {
        return {
          data: {
            expired: false,
          },
          error: null,
          message: 'success',
          code: 200,
        };
      }
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'TestRequest info',
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

  @Get('startTest/:testRequestId')
  async startTest(@Param('testRequestId') testRequestId: string) {
    try {
      const resp = await this.testRequestService.startTest(
        new Types.ObjectId(testRequestId),
      );
      return {
        data: { token: resp },
        error: null,
        message: 'success',
        code: 200,
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

  @Post('testLink-status')
  async checkLinkStatus(@Body() body: any) {
    try {
      const isValid = verify(body.token, constants.SECRET_KEY, {
        complete: true,
      });
      return { expStatus: false, data: isValid };
    } catch (error) {
      console.log(error);
      return { expStatus: true, Msg: 'Token is expired' };
    }
  }

  @Get('list')
  async getTestRequestList() {
    try {
      let resp = await this.testRequestService.getList();
      resp[0].subject = resp[0].subject.name;
      resp[0].user = {
        name: resp[0].user.firstName + ' ' + resp[0].user.lastName,
      };
      return {
        data: resp[0],
        code: 200,
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
        error: error,
        message: error.message || 'something went wrong',
        data: null,
        code: 400,
      };
    }
  }
}
