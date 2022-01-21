import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { StripeConfigurationModel } from '@workspace/common/models';

@Injectable()
export class StripeConfigurationService {
  async retrieve(): Promise<StripeConfigurationModel> {
    if (!environment.stripePublishableKey) {
      throw new StripePublishableKeyNotFoundError();
    }

    return { publishableKey: environment.stripePublishableKey };
  }
}
