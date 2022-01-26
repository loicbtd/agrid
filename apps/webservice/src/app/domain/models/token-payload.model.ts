import { GlobalRoleEnumeration } from "@workspace/common/enumerations";

export class TokenPayload {
  userId?: string;
  globalRoles?: GlobalRoleEnumeration[];
}
