import { ApplicationError } from './application.error';

export class ImpossibleToLoadStripeError extends ApplicationError {
  constructor() {
    super('Impossible to load Stripe');
  }
}
