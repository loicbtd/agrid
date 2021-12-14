import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SupportRequest {
  @ApiProperty()
  @IsNotEmpty()
  firstname!: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  subject!: string;

  @ApiProperty()
  @IsNotEmpty()
  explanation!: string;
}
