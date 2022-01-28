import { Injectable } from '@nestjs/common';
import { SupportRequest } from '@workspace/common/requests';
import { environment } from '../../../environments/environment';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { UnabilityToSendEmailError } from '../errors/unability-to-send-email.error';
import { EmailsService } from './emails.service';

@Injectable()
export class SupportService {
  constructor(private readonly emailsService: EmailsService) {}

  async request(command: SupportRequest) {
    try {
      await this.emailsService.send(
        EmailTemplateEnumeration.Contact,
        environment.supportEmailAddress,
        command.subject,
        {
          data: command,
          replyto: command.email,
        }
      );
    } catch (error) {
      throw new UnabilityToSendEmailError(
        error.message,
        environment.supportEmailAddress,
        EmailTemplateEnumeration.Contact
      );
    }
  }
}
