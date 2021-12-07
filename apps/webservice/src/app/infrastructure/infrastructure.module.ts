import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { environment } from '../../environments/environment';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: environment.emailSenderSmtpHost,
        port: 465,
        auth: {
          user: environment.emailSenderLogin,
          pass: environment.emailSenderPassword,
        },
        logger: true,
        debug: !environment.production,
      },
      defaults: {
        from: `${environment.emailSenderName} <${environment.emailSenderAddress}>`,
      },
      template: {
        dir: join(__dirname, 'mail-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class InfrastructureModule {}
