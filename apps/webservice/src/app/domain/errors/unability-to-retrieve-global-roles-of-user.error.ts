import { DomainError } from './domain.error';

export class UnabilityToRetrieveGlobalRolesOfUserError extends DomainError {
  private readonly userId: string;

  constructor(originalErrorMessage: string, userId: string) {
    super(originalErrorMessage);
    this.userId = userId;
  }
}
