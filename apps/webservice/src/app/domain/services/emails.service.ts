import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { join } from 'path';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async send(
    template: EmailTemplateEnumeration,
    to: string | string[],
    subject: string,
    data?: any
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
        context: {
          ...data,
          emailHeaderSource: `${environment.protocol}://${environment.host}:${environment.port}/images/email-header.jpg`,
        },
      });
    } catch (error) {
      console.log(error);

      throw new Error(error.message);
    }
  }
}
