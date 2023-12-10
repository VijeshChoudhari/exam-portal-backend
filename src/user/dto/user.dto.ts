import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Password@123' })
  password: string;
}

export class SignupUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'firstName' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'lastName' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Password@123' })
  password: string;
}
