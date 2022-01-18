import { DomainError } from './domain.error';

export class EntityNotFoundError extends DomainError {
  private type: string;

  constructor(originalErrorMessage: string, type: string) {
    super(originalErrorMessage);
    this.type = type;
  }
}
