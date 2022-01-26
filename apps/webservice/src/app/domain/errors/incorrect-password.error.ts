import { DomainError } from './domain.error';

export class IncorrectPasswordError extends DomainError {
  constructor() {
    super('Incorrect password');
  }
}
