import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { DomainError } from './domain.error';

export class UnabilityToSendEmailError extends DomainError {
  private recipientEmail: string | string[];
  private emailTemplate: EmailTemplateEnumeration;

  constructor(
    originalErrorMessage: string,
    recipientEmail: string | string[],
    emailTemplate: EmailTemplateEnumeration
  ) {
    super(originalErrorMessage);
    this.recipientEmail = recipientEmail;
    this.emailTemplate = emailTemplate;
  }
}
