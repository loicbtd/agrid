import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayloadModel } from '../../domain/models/token-payload.model';

export const JwtPayload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayloadModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
