import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;
}
