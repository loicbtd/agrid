import { IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname?: string;
}
