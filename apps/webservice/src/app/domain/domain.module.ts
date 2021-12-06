import { EmailsService } from './services/emails.service';
import { JwtModule } from '@nestjs/jwt';
import { Global, HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { environment } from '../../environments/environment';
import { UsersService } from './services/users.service';

const PROVIDERS = [EmailsService, UsersService, JwtStrategy];

const ENTITIES = [User];

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: {
        expiresIn: environment.jwtExpirationTime,
      },
    }),
    PassportModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: environment.databaseHost,
      port: environment.databasePort,
      username: environment.databaseLogin,
      password: environment.databasePassword,
      database: environment.databaseName,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      cache: environment.production,
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS, JwtModule, TypeOrmModule, HttpModule, PassportModule],
})
export class DomainModule {}
