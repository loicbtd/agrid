import { DomainError } from './domain.error';

export class WebhookError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
