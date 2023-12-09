import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

export type Question = {
  questionNo: Number;
  question: String;
  options: Array<String>;
  answer: String;
};

@Schema({ timestamps: true, versionKey: false })
export class Subject {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  noOfTest: number;

  @Prop({ required: true })
  questions: Array<Question>;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
