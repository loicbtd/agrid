import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { environment } from './environments/environment';
import { WinstonModule } from 'nest-winston';
import { ConsoleTransport } from '@workspace/winston/transports';

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

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());

  await app.listen(environment.port, environment.host);

  new Logger().log(
    `Listening ${environment.schema}://${environment.host}:${environment.port}`
  );
})();
