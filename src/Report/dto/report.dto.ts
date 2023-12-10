import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly testId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly subjectId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly userId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly testRequestId: string;

  //   @IsNotEmpty()
  //   @Type(() => Array<string>)
  //   readonly testQuestions: Array<number>;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly userResponse: Array<ResponseAnsDto>;
}

export class ResponseAnsDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly questionNo: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly responseAns: string;

  @ApiProperty({ required: true })
  readonly options: Array<string>;
}

// export class CreateSubjectDto {
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ example: 'C++' })
//   name: string;
// }

// export class QuestionDto {
//   @IsNotEmpty()
//   @IsNumber()
//   @ApiProperty({ required: true, example: 1 })
//   readonly questionNo: number;

//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ required: true, example: 'which one is correct ?' })
//   readonly question: string;

//   @IsNotEmpty()
//   @Type(() => Array<string>)
//   readonly options: Array<string>;

//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ required: true, example: 'my name is sun' })
//   readonly answer: string;
// }

// export class GetAllSubjectDto {
//   @IsString()
//   @ApiProperty({ example: 'JAVA' })
//   search: string;

//   @IsNotEmpty()
//   @IsNumber()
//   @ApiProperty({ example: 1 })
//   currentPage: number;

//   @IsNotEmpty()
//   @IsNumber()
//   @ApiProperty({ example: 10 })
//   limit: number;
// }

// export class AddQuestionDto {
//   @IsNotEmpty()
//   @IsString()
//   readonly subjectId: string;

//   @IsNotEmpty({ each: true })
//   @Type(() => Array<QuestionDto>)
//   readonly questions: Array<QuestionDto>;
// }
