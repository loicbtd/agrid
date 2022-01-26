import { Global, Module } from '@nestjs/common';
import { IdentitiesController } from '../api/controllers/identities.controller';
import { PlansController } from './controllers/plans.controller';
import { SupportController } from './controllers/support.controller';
import { SubscriptionsController } from './controllers/subscriptions.controller';
import {
  AcceptLanguageResolver,
  I18nJsonParser,
  I18nModule,
} from 'nestjs-i18n';
import { environment } from '../../environments/environment';
import { join } from 'path';
import { StripeController } from './controllers/stripe.controller';
import { ProfilesController } from './controllers/profiles.controller';
import { InitialSetupController } from './controllers/initial-setup.controller';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      fallbacks: {
        'fr-*': 'fr',
        'en-*': 'en',
      },
      logging: false,
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
    InitialSetupController,
    PlansController,
    ProfilesController,
    StripeController,
    SubscriptionsController,
    SupportController,
  ],
})
export class ApiModule {}
