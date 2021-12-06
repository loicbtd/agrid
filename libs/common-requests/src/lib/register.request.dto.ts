import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { passwordRegexp } from '@workspace/common/regexp';

export class RegisterRequestDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  @Matches(passwordRegexp, { message: 'Password too weak' })
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  firstname!: string;

  @IsNotEmpty()
  lastname!: string;

  public constructor(attributes?: Partial<RegisterRequestDto>) {
    Object.assign(this, attributes);
  }
}
