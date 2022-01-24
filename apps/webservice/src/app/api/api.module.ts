import { Global, Logger, Module, Scope } from '@nestjs/common';
import { IdentitiesController } from '../api/controllers/identities.controller';
import { PlansController } from './controllers/plans.controller';
import { SupportController } from './controllers/support.controller';
import { SubscriptionsController } from './controllers/subscriptions.controller';
import { FASTIFY_ADAPTER } from './constants/provider-names.constant';
import { ErrorsFilter } from './filters/errors.filter';
import { APP_FILTER } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import {
  AcceptLanguageResolver,
  I18nJsonParser,
  I18nModule,
} from 'nestjs-i18n';
import { environment } from '../../environments/environment';
import { join } from 'path';
import { StripeController } from './controllers/stripe.controller';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      fallbacks: {
        'fr-*': 'fr',
        'en-*': 'en',
      },
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, 'assets', 'translations'),
        watch: !environment.production,
      },
      resolvers: [new AcceptLanguageResolver()],
    }),
  ],
  controllers: [
    IdentitiesController,
    PlansController,
    StripeController,
    SubscriptionsController,
    SupportController,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
      scope: Scope.REQUEST,
    },
    {
      provide: FASTIFY_ADAPTER,
      useClass: FastifyAdapter,
      scope: Scope.DEFAULT,
    },
  ],
})
export class ApiModule {}
