import { DomainError } from './domain.error';

export class UnabilityToSaveUserError extends DomainError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
