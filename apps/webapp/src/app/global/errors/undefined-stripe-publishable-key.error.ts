import { ApplicationError } from './application.error';

export class UndefinedStripePublishableKeyError extends ApplicationError {
  constructor() {
    super('Undefined Stripe publishable key');
  }
}
