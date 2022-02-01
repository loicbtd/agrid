import { DomainError } from './domain.error';

export class UnabilityToRetrieveUsersError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
