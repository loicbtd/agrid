import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordRegexp } from '@workspace/common/regexp';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @Matches(passwordRegexp, { message: 'Password too weak' })
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname?: string;
}
