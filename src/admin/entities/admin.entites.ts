import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true, versionKey: false })
export class Admin {
  @Prop({ lowercase: true, unique: true, required: true })
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsNotEmpty()
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
