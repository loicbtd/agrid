import { environment } from './../../../environments/environment';
import { CreateUserRequest, SigninRequest } from '@workspace/common/requests';
import { DateStatisticsResponseDto, SigninResponse } from '@workspace/common/responses';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { EmailsService } from './emails.service';
import { TokenPayload } from '../models/token-payload.model';
import { DateFormatPostgreSQL } from '../enumerations/date-format-postgresql.enumeration';
import { UnkownUserError } from '../errors/unkown-user.error';
import { MismatchingHashesError } from '../errors/mismatching-hashes.error';
import { UnabilityToSendEmailError } from '../errors/unability-to-send-email.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService
  ) {}

  async signin(command: SigninRequest): Promise<SigninResponse> {
    let user: UserEntity;
    try {
      user = await this.usersRepository.findOneOrFail({ email: command.email  });
    } catch(error: any) {
      throw new UnkownUserError(error.message);
    }

    if (!(await bcrypt.compare(command.password, user.password))) {
      throw new MismatchingHashesError();
    }

    // let globalRight: = 


    const payload: TokenPayload = {
      userId: user.id,
      // globalRoles: user.,
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

  async create(command: CreateUserRequest): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      command.password,
      environment.passwordHashSalt
    );

    try {
      await this.usersRepository.insert({
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
    const administrators = await this.usersRepository.find({});

    console.log(administrators);

    return false;
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
