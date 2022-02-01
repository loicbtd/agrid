import { MyProfileModel } from '@workspace/common/models';

export class SigninResponse {
  token?: string;

  profile?: MyProfileModel;
}
