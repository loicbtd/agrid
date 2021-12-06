import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { environment } from './environments/environment';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle(environment.webserviceName)
    .setVersion(environment.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());

  await app.listen(environment.port, environment.host);

  if (!environment.production) {
    console.log(
      `\nWebservice running on http://${environment.host}:${environment.port}\n`
    );
  }
})();
