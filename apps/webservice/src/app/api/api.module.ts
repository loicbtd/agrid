import { environment } from './../../environments/environment';
import { StripeController } from './controllers/stripe.controller';
import { Global, Logger, Module } from '@nestjs/common';
import { IdentitiesController } from '../api/controllers/identities.controller';
import { PlansController } from './controllers/plans.controller';
import { SupportController } from './controllers/support.controller';
import { SubscriptionsController } from './controllers/subscriptions.controller';

@Global()
@Module({
  controllers: [
    IdentitiesController,
    PlansController,
    StripeController,
    SubscriptionsController,
    SupportController,
  ],
  providers: [Logger],
})
export class ApiModule {}
