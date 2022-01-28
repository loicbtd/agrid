import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProfileRequest {
  @ApiProperty()
  @IsNotEmpty()
  firstname!: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname!: string;
}
