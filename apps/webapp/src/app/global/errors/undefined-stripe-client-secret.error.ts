import { ApplicationError } from './application.error';

export class UndefinedStripeClientSecretError extends ApplicationError {
  constructor() {
    super('Undefined Stripe client secret');
  }
}
