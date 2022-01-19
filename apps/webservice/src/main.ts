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

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger({
        transports: [new ConsoleTransport()],
      }),
    }
  );

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

  new Logger().log(
    `Listening ${environment.protocol}://${environment.host}:${environment.port}`
  );
})();
