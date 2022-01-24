import { DomainError } from './domain.error';

export class UnabilityToCreateSubscriptionError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
