import { DomainError } from './domain.error';

export class AlreadyExistingUserError extends DomainError {
  constructor() {
    super('Already existing user');
  }
}
