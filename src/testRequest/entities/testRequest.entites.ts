import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TestRequestDocument = HydratedDocument<TestRequest>;

@Schema({ timestamps: true, versionKey: false })
export class TestRequest {
  @Prop({ required: true, type: Types.ObjectId })
  subjectId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  testNumber: number;

  @Prop({ required: true, type: Boolean })
  approvalPending: boolean;

  @Prop({ required: true, type: Boolean })
  approvalStatus: boolean;
}

export const TestRequestSchema = SchemaFactory.createForClass(TestRequest);
