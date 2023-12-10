import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  AddQuestionDto,
  CreateSubjectDto,
  GetAllSubjectDto,
} from './dto/subject.dto';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  //   @UseGuards(AuthGuard)
  //   @ApiBearerAuth('JWT')
  @Post('create')
  async createSubject(@Body() body: CreateSubjectDto) {
    try {
      const resp = await this.subjectService.create(body.name);

      return {
        code: 200,
        data: resp,
        error: null,
        message: 'success',
      };
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'create subject',
          error: error.message,
          message: 'final catch error',
        }),
      );

      return {
        code: 400,
        data: null,
        error: error,
        message: error.message || 'something went wrong',
      };
    }
  }

  //   @UseGuards(AuthGuard)
  //   @ApiBearerAuth('JWT')
  @Post('add-question')
  async addQuestions(@Body() body: AddQuestionDto) {
    try {
      const resp = await this.subjectService.addQuestion(
        new Types.ObjectId(body.subjectId),
        body.questions,
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
          method: 'add-question',
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

  @Post('get-all')
  async getAllSubject(@Body() body: GetAllSubjectDto) {
    try {
      const skip = (body.currentPage - 1) * body.limit;
      const resp = await this.subjectService.getAllSubject(
        body.search,
        skip,
        body.limit,
      );

      return {
        data: resp,
        code: 200,
        error: null,
        message: 'success',
      };
    } catch (error) {
      console.log(
        JSON.stringify({
          method: 'get all subjects',
          error: error.message,
          message: 'final catch error',
        }),
      );

      return {
        code: 400,
        data: null,
        error: error,
        message: error.message || 'something went wrong',
      };
    }
  }
}
