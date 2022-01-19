import { ConfigurationModel } from './../../../../../../libs/common-models/src/lib/configuration.model';
import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  async retrieve(): Promise<ConfigurationModel> {
    if (!environment.stripePublishableKey) {
      throw new StripePublishableKeyNotFoundError();
    }

    return { stripePublishableKey: environment.stripeSecretKey };
  }
}
