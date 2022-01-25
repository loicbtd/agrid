import { MyProfileModel } from '@workspace/common/models';

export class SigninResponseDto {
  token?: string;

  profile?: MyProfileModel;
}
