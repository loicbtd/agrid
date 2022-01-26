import { DomainError } from './domain.error';

export class UnkownUserError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
