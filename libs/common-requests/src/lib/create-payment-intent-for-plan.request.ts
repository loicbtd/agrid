import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePaymentIntentForPlanRequest {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
