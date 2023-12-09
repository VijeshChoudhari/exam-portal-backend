import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

@Schema({ timestamps: true, versionKey: false })
export class Test {
  @Prop({ required: true, type: Types.ObjectId })
  subjectId: Types.ObjectId;

  @Prop({ required: true, type: Array<Number> })
  questions: Array<number>;

  @Prop({ required: true, type: Number })
  number: number;

  @Prop({ required: true, type: Number })
  testDurationInHour: number;
}

export const TestSchema = SchemaFactory.createForClass(Test);
