import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true, versionKey: false })
export class Report {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  subjectId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  testRequestId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  correctAnsCount: number;

  @Prop({ required: true, type: Number })
  wrongAnsCount: number;

  @Prop({ required: true, type: String })
  percentage: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
