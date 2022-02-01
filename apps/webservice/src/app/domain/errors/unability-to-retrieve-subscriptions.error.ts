import { DomainError } from './domain.error';

export class UnabilityToRetrieveSubscriptionsError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
