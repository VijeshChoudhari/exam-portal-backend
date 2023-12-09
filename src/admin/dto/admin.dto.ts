import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAdminDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'admin@gmail.com'})
    email : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"Password@123"})
    password : string;
}

export class SignupAdminDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'admin@gmail.com'})
    email : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'admin'})
    name : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"Password@123"})
    password : string;
}
