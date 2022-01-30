import { DomainError } from './domain.error';

export class StripeError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
