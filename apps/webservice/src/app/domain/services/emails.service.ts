import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
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
    options?: {
      data?: unknown;
      from?: Address;
      replyto?: string;
    }
  ): Promise<void> {
    options['data']['mailBannerSrc'] = this.mailBannerSrc;
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
        context: options?.data,
        replyTo: options?.replyto,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
