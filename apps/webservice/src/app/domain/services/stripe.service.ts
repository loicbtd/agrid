import { environment } from './../../../environments/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  async retrievePushableKey(): Promise<string> {
    return environment.stripePublishableKey;
  }
}
