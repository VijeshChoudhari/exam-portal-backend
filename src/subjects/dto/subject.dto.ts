import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isArray } from 'class-validator';
import { Question } from '../entites/subject.entites';
import { Type } from 'class-transformer';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'C++' })
  name: string;
}

export class QuestionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, example: 1 })
  readonly questionNo: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'which one is correct ?' })
  readonly question: string;

  @IsNotEmpty()
  @Type(() => Array<string>)
  readonly options: Array<string>;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'my name is sun' })
  readonly answer: string;
}

export class GetAllSubjectDto {
  @IsString()
  @ApiProperty({ example: 'JAVA' })
  search: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  currentPage: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10 })
  limit: number;
}

export class AddQuestionDto {
  @IsNotEmpty()
  @IsString()
  readonly subjectId: string;

  @IsNotEmpty({ each: true })
  @Type(() => Array<QuestionDto>)
  readonly questions: Array<QuestionDto>;
}
