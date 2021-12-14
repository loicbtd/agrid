import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupportRequest } from '@workspace/common/requests';
import { environment } from '../../../environments/environment';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
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
      throw new InternalServerErrorException();
    }
  }
}
