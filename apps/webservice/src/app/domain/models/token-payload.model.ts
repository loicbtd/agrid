import { GlobalRoleEnumeration } from "@workspace/common/enumerations";

export class TokenPayloadModel {
  userId?: string;
  globalRoles?: GlobalRoleEnumeration[];
}
