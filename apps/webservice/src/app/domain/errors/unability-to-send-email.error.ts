import { DomainError } from './domain.error';

export class UnabilityToSendEmailError extends DomainError {
  private recipientEmail: string | string[];
  private subject: string;

  constructor(
    originalErrorMessage: string,
    recipientEmail: string | string[],
    subject: string
  ) {
    super(originalErrorMessage);
    this.recipientEmail = recipientEmail;
    this.subject = subject;
  }
}
