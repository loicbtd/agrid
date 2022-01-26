import { Logger, Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ApiModule } from './api/api.module';
import { FASTIFY_ADAPTER } from './api/constants/provider-names.constant';
import { ErrorsFilter } from './api/filters/errors.filter';

import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ApiModule, DomainModule, InfrastructureModule],
  providers: [
    Logger,
    {
      provide: FASTIFY_ADAPTER,
      useClass: FastifyAdapter,
      scope: Scope.DEFAULT,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {}
