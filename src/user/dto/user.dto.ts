import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'user@gmail.com'})
    email : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"Password@123"})
    password : string;
}