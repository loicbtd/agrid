import { Global, Logger, Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { environment } from '../../environments/environment';

console.log(environment);


@Global()
@Module({
  providers: [Logger],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: environment.emailSenderSmtpHost,
        port: environment.emailSenderSmtpPort,
        auth: {
          user: environment.emailSenderLogin,
          pass: environment.emailSenderPassword,
        },
        debug: !environment.production,
      },
      defaults: {
        from: `${environment.emailSenderName} <${environment.emailSenderAddress}>`,
      },
      template: {
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class InfrastructureModule {}
