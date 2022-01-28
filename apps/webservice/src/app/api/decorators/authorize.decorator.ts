import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';
import { JwtGuard } from '../guards/jwt.guard';

export const Authorize = (...roles: GlobalRoleEnumeration[]) => {
  console.log(roles);

  return applyDecorators(ApiBearerAuth(), UseGuards(JwtGuard));
};
