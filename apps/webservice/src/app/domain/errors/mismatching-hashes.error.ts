import { DomainError } from './domain.error';

export class MismatchingHashesError extends DomainError {
  constructor() {
    super('Mismatching hashes');
  }
}
