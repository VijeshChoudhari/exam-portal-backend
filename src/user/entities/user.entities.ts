import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema({timestamps:true, versionKey:false})
export class User {
    @Prop({lowercase:true,unique:true,required:true})
    @IsNotEmpty()
    email :string;

    @Prop({required:true})
    @IsNotEmpty()
    firstName:string;

    @Prop({required:true})
    @IsNotEmpty()
    lastName:string;

    @Prop({required:true})
    @IsNotEmpty()
    password : string

    @Prop({required:true})
    @IsNotEmpty()
    emailIsAuthenticated : boolean
}

export const UserSchema = SchemaFactory.createForClass(User);