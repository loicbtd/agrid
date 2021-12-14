import { environment } from '../../../environments/environment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { join } from 'path';

@Injectable()
export class EmailsService {
  private readonly mailBannerSrc = `https://${environment.host}:${environment.port}/static/mail-banner.png`;

  constructor(private readonly mailerService: MailerService) {}

  async send(
    template: EmailTemplateEnumeration,
    to: string | string[],
    subject: string,
    data?: unknown,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: environment.production ? to : environment.emailSenderAddress,
        subject: subject,
        template: join(
          __dirname,
          'assets',
          'email-templates',
          `${template}.hbs`
        ),
        context: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
