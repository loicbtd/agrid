import { WhoamiResponseDto } from './whoami.response.dto';

export class SigninResponseDto {
  token!: string;

  whoami!: WhoamiResponseDto;
}
