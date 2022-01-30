import { DomainError } from './domain.error';

export class UnabilityToRetrievePlans extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
