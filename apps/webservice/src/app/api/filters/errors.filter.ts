import { InfrastructureError } from './../../infrastructure/errors/infrastructure.error';
import { ApiError } from './../errors/api.error';
import { DomainError } from './../../domain/errors/domain.error';
import {
  Logger,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { I18nService } from 'nestjs-i18n';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  constructor(
    private readonly _fastifyAdapter: FastifyAdapter,
    private readonly _logger: Logger,
    private readonly _i18nService: I18nService
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    let httpStatusCode: number;
    let httpMessage: string;

    if (exception instanceof ApiError || exception instanceof DomainError) {
      httpStatusCode = HttpStatus.BAD_REQUEST;
      httpMessage = await this._i18nService.translate('test.day_interval');
      exception.constructor.name;
      this._logger.warn(exception.message, exception);
    } else if (exception instanceof InfrastructureError) {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      httpMessage = exception.message;
      this._logger.error(exception.message, exception);
    } else {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      httpMessage = 'Unhandled error';
      this._logger.error(JSON.stringify(exception), exception);
    }

    this._fastifyAdapter.reply(
      host.switchToHttp().getResponse(),
      { statusCode: httpStatusCode, message: httpMessage },
      httpStatusCode
    );
  }

  // async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
  //   const languages: Language[] =
  //     parse(
  //       context?.switchToHttp()?.getRequest()?.headers['accept-language']
  //     ) || [];

  //   if (languages.length < 1) {
  //     languages.push({ code: 'en', region: 'US', quality: 1 });
  //   }

  //   try {
  //     return await lastValueFrom(next.handle());
  //   } catch (error: any) {
  //     this._logger.error(error.message, error);
  //     throw new BadRequestException();
  //   }
  // }
}
