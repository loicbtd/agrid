import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ErrorsFilter } from './api/filters/errors.filter';
import { Logger, Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApiModule } from './api/api.module';

import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { environment } from '../environments/environment';
import * as path from 'path';

@Module({
  imports: [
    ApiModule,
    DomainModule,
    InfrastructureModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, 'assets', 'translations'),
        watch: !environment.production,
      },
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
    {
      provide: 'FASTIFY_ADAPTER',
      useClass: FastifyAdapter,
      scope: Scope.DEFAULT,
    },
  ],
})
export class AppModule {}
