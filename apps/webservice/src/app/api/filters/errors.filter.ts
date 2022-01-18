import { InfrastructureError } from './../../infrastructure/errors/infrastructure.error';
import { ApiError } from './../errors/api.error';
import { DomainError } from './../../domain/errors/domain.error';
import {
  Logger,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { FASTIFY_ADAPTER } from '../constants/provider-names.constant';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  constructor(
    @Inject(FASTIFY_ADAPTER) private readonly _fastifyAdapter: FastifyAdapter,
    private readonly _logger: Logger,
    private readonly _i18nService: I18nRequestScopeService
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    let httpStatusCode: number;
    let httpMessage: string;

    if (exception instanceof ApiError || exception instanceof DomainError) {
      httpStatusCode = HttpStatus.BAD_REQUEST;
      httpMessage = await this._i18nService.translate(
        `errors.${exception.constructor.name}`
      );
      this._logger.warn(exception.message, exception);
    } else if (exception instanceof InfrastructureError) {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      httpMessage = await this._i18nService.translate(
        `errors.${exception.constructor.name}`
      );
      this._logger.error(exception.message, exception);
    } else {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      httpMessage = await this._i18nService.translate('errors.Unkown');
      this._logger.error(JSON.stringify(exception), exception);
    }

    this._fastifyAdapter.reply(
      host.switchToHttp().getResponse(),
      { statusCode: httpStatusCode, message: httpMessage },
      httpStatusCode
    );
  }
}
