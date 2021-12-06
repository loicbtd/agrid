import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  public constructor(attributes?: Partial<SigninRequestDto>) {
    Object.assign(this, attributes);
  }
}
