import { ErrorsInterceptor } from './interceptors/error.interceptor';
import { Global, Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IdentitiesController } from '../api/controllers/identities.controller';
import { PlansController } from './controllers/plans.controller';
import { SupportController } from './controllers/support.controller';

@Global()
@Module({
  controllers: [IdentitiesController, PlansController, SupportController],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class ApiModule {}
