import { ExternalApiService } from './external-api.service';
import { environment } from 'environments/environment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as dateFormat from 'dateformat';
import { EmailTemplate } from '../enumerations/email-template.emumeration';

@Injectable()
export class EmailsService {
  private readonly mailBannerSrc =
    'https://api.webishare.ml/static/mail-banner.png';

  constructor(
    private mailerService: MailerService,
    private externeApiService: ExternalApiService
  ) {}

  async send(
    from: string,
    to: string[],
    subject: string,
    template: EmailTemplate,
    data?: unknown
  ): Promise<void> {

    try {
      await this.mailerService.sendMail({
        to: environment.debug ? environment.emailAddress : email,
        subject: '[Webishare] Welcome !',
        template: `assets/email-templates/${template}.hbs`,
        context: data,
      });
    } catch (error) {
      throw new BadRequestException();
    }


    const transporter = createTransport({
      host: 'mail.eu.jeta.aero',
      port: 25,
      ignoreTLS: true,
    });
    transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: compile(
        readFileSync(
          join(__dirname, 'assets', 'email-templates', `${template}.hbs`),
          'utf8'
        )
      )(data),
    });
  }

  async sendWelcomeEmailTo(email: string, firstname: string) {
    try {
      await this.mailerService.sendMail({
        to: environment.debug ? environment.emailAddress : email,
        subject: '[Webishare] Welcome !',
        template: 'welcome',
        context: {
          mailBannerSrc: this.mailBannerSrc,
          firstname: firstname,
          linkWebsite: environment.webAppUrl,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async sendParticipateEmailTo(email: string, webinar: Webinar) {
    try {
      const webinarAddress = await this.externeApiService.getAddressWithCoord(
        webinar
      );
      await this.mailerService.sendMail({
        to: environment.debug ? environment.emailAddress : email,
        subject: '[Webishare] Votre participation au webinaire !',
        template: 'participate',
        context: {
          mailBannerSrc: this.mailBannerSrc,
          title: webinar.title,
          date: dateFormat(webinar.date, 'dd/mm/yyyy'),
          time: dateFormat(webinar.date, 'HH:MM'),
          link: webinar.link,
          linkWebsite: environment.webAppUrl,
          address: webinarAddress,
          isPrensential: webinar.isPresential,
          lat: webinar.latitude,
          lon: webinar.longitude,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
