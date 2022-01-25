import { DomainError } from './domain.error';

export class UnabilityToCreatePaymentIntentWithStripeError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
