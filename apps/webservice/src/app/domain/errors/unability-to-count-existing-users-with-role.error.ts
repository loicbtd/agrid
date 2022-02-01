import { DomainError } from './domain.error';

export class UnabilityToCountExistingUsersWithRoleError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
