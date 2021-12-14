import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactRequestDto {
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

  public constructor(attributes?: Partial<ContactRequestDto>) {
    Object.assign(this, attributes);
  }
}
