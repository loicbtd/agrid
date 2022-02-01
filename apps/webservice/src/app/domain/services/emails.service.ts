import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { UnabilityToSendEmailError } from '../errors/unability-to-send-email.error';

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
      emailHeaderSource: `https://real-it.fr/wp-content/uploads/2022/02/email-header.jpg`,
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
      throw new UnabilityToSendEmailError(error.message, to, template);
    }
  }
}
