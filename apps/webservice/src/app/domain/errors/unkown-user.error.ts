import { DomainError } from './domain.error';

export class UnkownUserError extends DomainError {
  constructor() {
    super('Unknown user');
  }
}
