import { DomainError } from './domain.error';

export class AlreadyActiveSubscriptionError extends DomainError {
  constructor() {
    super('Already active subscription');
  }
}
