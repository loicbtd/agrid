import { ErrorsFilter } from './app/api/filters/errors.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { environment } from './environments/environment';
import { WinstonModule } from 'nest-winston';
import { ConsoleTransport } from '@workspace/winston/transports';
import { fastifyHelmet } from 'fastify-helmet';
import { I18nJsonParser, I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import * as path from 'path';

(async () => {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger: WinstonModule.createLogger({
        transports: [new ConsoleTransport()],
      }),
    }
  );

  const logger = new Logger();

  app.register(require('fastify-cors'), {
    origin: [environment.webappUrl],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  const config = new DocumentBuilder()
    .setTitle(`${environment.solutionName} Api`)
    .setVersion(environment.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.register(fastifyHelmet, { contentSecurityPolicy: false });

  await app.listen(environment.port, environment.host);

  logger.log(
    `Listening ${environment.protocol}://${environment.host}:${environment.port}`
  );
})();
