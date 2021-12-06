import { ExternalApiService } from './services/external-api.service';
import { Interest } from './entities/interest.entity';
import { Webinar } from './entities/webinar.entity';
import { EmailsService } from './services/emails.service';
import { JwtModule } from '@nestjs/jwt';
import { Global, HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

const PROVIDERS = [
  EmailsService,
  ExternalApiService,
  JwtStrategy,
];

const ENTITIES = [User, Webinar, Interest];

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: environment.jwtsecret,
      signOptions: {
        expiresIn: environment.jwtexpiresIn,
      },
    }),
    PassportModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.typeormHost,
      port: environment.typeormPort,
      username: environment.typeormUsername,
      password: environment.typeormPassword,
      database: environment.typeormDatabase,
      autoLoadEntities: true,
      synchronize: true,
      logging: environment.typeormLogging,
      cache: environment.typeormCache,
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS, JwtModule, TypeOrmModule, HttpModule, PassportModule],
})
export class DomainModule {}
