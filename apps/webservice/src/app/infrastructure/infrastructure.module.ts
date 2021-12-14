import { Global, Logger, Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '../../environments/environment';
import { join } from 'path';

@Global()
@Module({
  providers: [Logger],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: join(__dirname, 'assets', 'images'),
    }),
    MailerModule.forRoot({
      transport: {
        host: environment.emailSenderSmtpHost,
        secure: true,
        port: 465,
        auth: {
          user: environment.emailSenderLogin,
          pass: environment.emailSenderPassword,
        },
        debug: !environment.production,
      },
      defaults: {
        from: `"${environment.emailSenderName}" <${environment.emailSenderAddress}>`,
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
