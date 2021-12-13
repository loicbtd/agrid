import { IsNotEmpty, IsUUID, IsNumber, IsString } from 'class-validator';

export class CreatePlanRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  supportTypeId: string;
}
