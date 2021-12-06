import { environment } from '../../../environments/environment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';

@Injectable()
export class EmailsService {
  private readonly mailBannerSrc = `https://${environment.host}:${environment.port}/static/mail-banner.png`;

  constructor(private mailerService: MailerService) {}

  async send(
    template: EmailTemplateEnumeration,
    to: string | string[],
    subject: string,
    data?: unknown,
    from?: Address
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: from,
        to: environment.production ? environment.emailSenderAddress : to,
        subject: subject,
        template: `assets/email-templates/${template}.hbs`,
        context: data,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
