import { DomainError } from './domain.error';

export class UnabilityToSaveSubscriptionsError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
