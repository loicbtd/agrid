import { GlobalRoleEnumeration } from '@workspace/common/enumerations';

export class MyProfileModel {
  email?: string;

  firstname?: string;

  lastname?: string;

  globalRoles?: GlobalRoleEnumeration[];
}
