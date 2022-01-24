import { DomainError } from './domain.error';

export class UnabilityToCreateUserError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
