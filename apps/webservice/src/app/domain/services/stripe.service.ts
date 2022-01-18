import { StripePublishableKeyNotFoundError } from './../errors/stripe-publishable-key-not-found.error';
import { environment } from './../../../environments/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  async retrievePublishableKey(): Promise<string> {
    throw new StripePublishableKeyNotFoundError();
    return environment.stripePublishableKey;
  }
}
