import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../../domain/models/token-payload.model';

export const JwtPayload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
