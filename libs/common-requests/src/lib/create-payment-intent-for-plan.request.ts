import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePaymentIntentForPlanRequest {
  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
