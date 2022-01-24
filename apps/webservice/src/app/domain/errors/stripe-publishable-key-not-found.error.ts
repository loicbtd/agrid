import { DomainError } from './domain.error';

export class StripePublishableKeyNotFoundError extends DomainError {
  constructor() {
    super('payment method charge is not authorized by stripe');
  }
}
