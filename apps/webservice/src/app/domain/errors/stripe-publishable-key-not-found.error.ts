import { DomainError } from './domain.error';

export class StripePublishableKeyNotFoundError extends DomainError {
  constructor() {
    super('stripe publishable key not found');
  }
}
