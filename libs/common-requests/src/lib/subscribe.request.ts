import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeRequest {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  planId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentIntendId?: string;
}
