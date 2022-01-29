import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePlanRequest {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty()
  @IsNotEmpty()
  stripeProductId!: string;

  @ApiProperty()
  @IsNotEmpty()
  stripeProductPriceId!: string;
}
