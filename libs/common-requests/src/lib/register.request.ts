import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { passwordRegexp } from '@workspace/common/regexp';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterRequest {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @MinLength(8)
  @Matches(passwordRegexp, { message: 'Password too weak' })
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname!: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname!: string;
}
