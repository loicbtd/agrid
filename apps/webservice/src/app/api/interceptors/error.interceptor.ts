import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private readonly _logger: Logger) {}

  async intercept(_context: ExecutionContext, next: CallHandler): Promise<any> {
    try {
      return await next.handle().toPromise();
    } catch (error: any) {
      this._logger.error(error.message, error);
      console.log(error);

      throw new BadRequestException();
    }
  }
}
