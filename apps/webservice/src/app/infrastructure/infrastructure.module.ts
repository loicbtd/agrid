import { Global, Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '../../environments/environment';
import { join } from 'path';
import { UsersPostgresqlAdapter } from './adapters/users-postgresql.adapter';

const ADAPTERS = [UsersPostgresqlAdapter];

@Global()
@Module({
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
        dir: join(__dirname, 'assets', 'email-templates'),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [...ADAPTERS],
  exports: [...ADAPTERS],
})
export class InfrastructureModule {}
