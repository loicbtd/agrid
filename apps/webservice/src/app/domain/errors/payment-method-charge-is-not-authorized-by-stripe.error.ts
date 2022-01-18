import { DomainError } from './domain.error';

export class PaymentMethodChargeIsNotAuthorizedByStripeError extends DomainError {
  constructor() {
    super('stripe publishable key not found');
  }
}
