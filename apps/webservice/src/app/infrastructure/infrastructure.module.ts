import { environment } from 'environments/environment';
import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: join(__dirname, 'static'),
    }),
    MailerModule.forRoot({
      transport: {
        host: environment.emailSmtpServer,
        port: 465,
        auth: {
          user: environment.emailAddress,
          pass: environment.emailPassword,
        },
        logger: environment.debug,
        debug: environment.debug,
      },
      defaults: {
        from: environment.emailFrom,
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
