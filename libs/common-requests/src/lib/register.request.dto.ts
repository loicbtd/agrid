import { REGEX_PATTERNS } from '../../domain/constants/regex-pattern';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  @Matches(new RegExp(REGEX_PATTERNS.PASSWORD), {
    message: 'Password too weak',
  })
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
