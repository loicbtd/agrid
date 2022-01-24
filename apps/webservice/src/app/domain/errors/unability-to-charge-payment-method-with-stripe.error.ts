import { DomainError } from './domain.error';

export class UnabilityToChargePaymentMethodWithStripeError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
