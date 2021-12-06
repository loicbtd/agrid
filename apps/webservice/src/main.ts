import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { environment } from './environments/environment';

const PACKAGE = require('../../../package.json');

const HOST = process.env.WEBSERVICE_HOST || 'localhost';
const PORT = process.env.WEBSERVICE_PORT || 3333;
const NAME = `${
  PACKAGE.name.charAt(0).toUpperCase() + PACKAGE.name.slice(1)
} Api`;
const VERSION = PACKAGE.version;

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(MainModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle(NAME)
    .setVersion(VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());

  await app.listen(PORT, HOST);

  if (!environment.production) {
    console.log(`\nWebservice running on http://${HOST}:${PORT}\n`);
  }
})();
