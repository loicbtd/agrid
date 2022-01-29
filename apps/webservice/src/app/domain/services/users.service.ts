import { environment } from './../../../environments/environment';
import { CreateUserRequest, SigninRequest } from '@workspace/common/requests';
import {
  DateStatisticsResponseDto,
  SigninResponse,
} from '@workspace/common/responses';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GlobalRoleOfUserEntity, UserEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { EmailsService } from './emails.service';
import { TokenPayloadModel } from '../models/token-payload.model';
import { DateFormatPostgreSQL } from '../enumerations/date-format-postgresql.enumeration';
import { UnkownUserError } from '../errors/unkown-user.error';
import { IncorrectPasswordError } from '../errors/incorrect-password.error';
import { UnabilityToSendEmailError } from '../errors/unability-to-send-email.error';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';
import { UnabilityToRetrieveGlobalRolesOfUserError } from '../errors/unability-to-retrieve-global-roles-of-user.error';
import { UnabilityToCountExistingUsersWithRoleError } from '../errors/unability-to-count-existing-users-with-role.error';
import { UnabilityRetrieveUsersError } from '../errors/unability-to-retrieve-users.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(GlobalRoleOfUserEntity)
    private readonly globalRoleOfUserRepository: Repository<GlobalRoleOfUserEntity>,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService
  ) {}

  async signin(command: SigninRequest): Promise<SigninResponse> {
    let user: UserEntity;
    try {
      user = await this.usersRepository.findOneOrFail({ email: command.email });
    } catch (error: any) {
      throw new UnkownUserError(error.message);
    }

    if (!(await bcrypt.compare(command.password, user.password))) {
      throw new IncorrectPasswordError();
    }

    let globalRoles: GlobalRoleEnumeration[] = [];
    try {
      globalRoles = (
        await this.globalRoleOfUserRepository.find({
          user: { id: user.id },
        })
      ).map((globalRoleOfUser) => globalRoleOfUser.globalRole);
    } catch (error: any) {
      throw new UnabilityToRetrieveGlobalRolesOfUserError(
        error.message,
        user.id
      );
    }

    const payload: TokenPayloadModel = {
      userId: user.id,
      globalRoles: globalRoles,
    };

    return {
      token: this.jwtService.sign(payload),
      profile: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  }

  async doesItAlreadyExist(user: UserEntity): Promise<boolean> {
    try {
      return (
        (await this.usersRepository.count({
          where: [{ email: user.email }],
        })) > 0
      );
    } catch (error: any) {
      throw new UnabilityRetrieveUsersError(error.message);
    }
  }

  async create(
    command: CreateUserRequest,
    options?: { globalRoles?: GlobalRoleEnumeration[] }
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      command.password,
      environment.passwordHashSalt
    );

    command.lastname = command.lastname.toUpperCase();
    command.firstname =
      command.firstname.charAt(0).toUpperCase() + command.firstname.slice(1);

    let user: UserEntity;
    try {
      user = await this.usersRepository.save({
        email: command.email,
        password: hashedPassword,
        firstname:
          command.firstname.charAt(0).toUpperCase() +
          command.firstname.slice(1),
        lastname: command.lastname.toUpperCase(),
      });
    } catch (error) {
      throw new ConflictException();
    }

    if (options.globalRoles && options.globalRoles?.length) {
      for (const globalRole of options.globalRoles) {
        await this.globalRoleOfUserRepository.save({
          user: { id: user.id },
          globalRole: globalRole,
        });
      }
    }

    try {
      this.emailsService.send(
        EmailTemplateEnumeration.Welcome,
        command.email,
        `[${environment.solutionName}] Bienvenue !`,
        {
          data: {
            firstname: command.firstname,
          },
        }
      );
    } catch (error: any) {
      throw new UnabilityToSendEmailError(
        error.message,
        command.email,
        EmailTemplateEnumeration.Welcome
      );
    }
  }

  async isThereAtLeastOneAdministrator(): Promise<boolean> {
    try {
      return (
        (await this.globalRoleOfUserRepository.count({
          globalRole: GlobalRoleEnumeration.Administrator,
        })) > 0
      );
    } catch (error: any) {
      throw new UnabilityToCountExistingUsersWithRoleError(error.message);
    }
  }

  async retrieveCount(filter: string): Promise<DateStatisticsResponseDto[]> {
    let format: string;
    switch (filter.toUpperCase()) {
      case 'DAY':
        format = DateFormatPostgreSQL.DAY;
        break;
      case 'MONTH':
        format = DateFormatPostgreSQL.MONTH;
        break;
      default:
        format = DateFormatPostgreSQL.YEAR;
        break;
    }
    return await this.usersRepository
      .createQueryBuilder('user')
      .select('COUNT(user.id) AS number')
      .addSelect(`to_char(date(user.createdAt),'${format}') as date`)
      .groupBy('date')
      .orderBy('date')
      .execute();
  }

  async retrieveCountOnCurrentMonth(): Promise<DateStatisticsResponseDto[]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select('COUNT(user.id) AS number')
      .addSelect(`CURRENT_DATE as date`)
      .where(
        `to_char(date(user.createdAt),'${DateFormatPostgreSQL.MONTH}') = to_char(date(CURRENT_DATE), '${DateFormatPostgreSQL.MONTH}')`
      )
      .groupBy(`to_char(date(user.createdAt),'${DateFormatPostgreSQL.MONTH}')`)
      .execute();
  }
}
