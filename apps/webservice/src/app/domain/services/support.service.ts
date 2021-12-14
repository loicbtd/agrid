import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactRequestDto } from '@workspace/common/requests';
import { environment } from '../../../environments/environment';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { EmailsService } from './emails.service';

@Injectable()
export class SupportService {
  constructor(private emailsService: EmailsService) {}

  async sendContactEmail(command: ContactRequestDto) {
    try {
      await this.emailsService.send(
        EmailTemplateEnumeration.Contact,
        'support@agrid.ml',
        `[${environment.solutionName}] Demande de Contact`,
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
