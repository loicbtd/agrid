import { MyProfileModel } from "@workspace/common/models";

export class Refresh {
  static readonly type = '[My Profile] Refresh';
  constructor(public profile: MyProfileModel) {}
}
