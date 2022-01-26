import { DomainError } from './domain.error';

export class UnabilityRetrieveUsersError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
