import { DomainError } from './domain.error';

export class UnhandledStripeEventError extends DomainError {
  constructor() {
    super('Unhandled Stripe event');
  }
}
