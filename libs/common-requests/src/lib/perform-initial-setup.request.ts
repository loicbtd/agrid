import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { mediumStrengthPassword } from '@workspace/common/regexp';

export class PerformInitialSetupRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(mediumStrengthPassword, { message: 'Password too weak' })
  password?: string;
}
