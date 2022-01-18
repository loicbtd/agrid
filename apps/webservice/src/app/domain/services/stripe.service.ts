import { StripePublishableKeyNotFoundError } from './../errors/stripe-publishable-key-not-found.error';
import { environment } from './../../../environments/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  async retrievePublishableKey(): Promise<string> {
    if (!environment.stripePublishableKey) {
      throw new StripePublishableKeyNotFoundError();
    }

    return environment.stripePublishableKey;
  }
}
