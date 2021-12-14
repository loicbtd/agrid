import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { join } from 'path';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async send(
    template: EmailTemplateEnumeration,
    to: string | string[],
    subject: string,
    options?: {
      data?: any;
      from?: Address;
      replyto?: string;
    }
  ): Promise<void> {
    if (!options) {
      options = {};
    }

    if (!options.data) {
      options.data = {};
    }

    options.data = {
      ...options.data,
      emailHeaderSource: `${environment.protocol}://${environment.host}:${environment.port}/images/email-header.jpg`,
      supportEmailAddress: environment.supportEmailAddress,
      webappUrl: environment.webappUrl,
    };

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
        context: options.data,
        replyTo: options.replyto,
      });
    } catch (error) {
      console.log(error);

      throw new Error(error.message);
    }
  }
}
