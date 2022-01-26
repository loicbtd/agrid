import { EmailsService } from './services/emails.service';
import { PlansService } from './services/plans.service';
import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PlanEntity,
  ServiceIncludedInPlanEntity,
  ServiceEntity,
  SubscriptionEntity,
  SupportTypeEntity,
  UserEntity,
  OrganizationTypeEntity,
  OrganizationEntity,
  GlobalRoleOfUserEntity,
} from '@workspace/common/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { environment } from '../../environments/environment';
import { UsersService } from './services/users.service';
import { StripeService } from './services/stripe.service';
import { SupportService } from './services/support.service';
import { SubscriptionService } from './services/subscriptions.service';
import { ProfilesService } from './services/profiles.service';
import { InitialSetupService } from './services/initial-setup.service';

const SERVICES = [
  EmailsService,
  InitialSetupService,
  PlansService,
  ProfilesService,
  StripeService,
  SubscriptionService,
  SupportService,
  UsersService,
];

const STRATEGIES = [JwtStrategy];

const ENTITIES = [
  GlobalRoleOfUserEntity,
  OrganizationTypeEntity,
  OrganizationEntity,
  PlanEntity,
  ServiceIncludedInPlanEntity,
  ServiceEntity,
  SubscriptionEntity,
  SupportTypeEntity,
  UserEntity,
];

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
      type: 'postgres',
      host: environment.databaseHost,
      port: environment.databasePort,
      username: environment.databaseLogin,
      password: environment.databasePassword,
      database: environment.databaseName,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      cache: environment.production,
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ],
  providers: [...SERVICES, ...STRATEGIES],
  exports: [
    ...SERVICES,
    ...STRATEGIES,
    JwtModule,
    TypeOrmModule,
    HttpModule,
    PassportModule,
  ],
})
export class DomainModule {}
