import { environment } from './../../../environments/environment';
import { CreateUserRequest, SigninRequest } from '@workspace/common/requests';
import { SigninResponse } from '@workspace/common/responses';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GlobalRoleOfUserEntity, UserEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';
import { EmailsService } from './emails.service';
import { TokenPayload } from '../models/token-payload.model';
import { UnkownUserError } from '../errors/unkown-user.error';
import { IncorrectPasswordError } from '../errors/incorrect-password.error';
import { UnabilityToSendEmailError } from '../errors/unability-to-send-email.error';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';
import { UnabilityToRetrieveGlobalRolesOfUserError } from '../errors/unability-to-retrieve-global-roles-of-user.error';

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
      ).map((globalRoleOfUser) => globalRoleOfUser.role);
    } catch (error: any) {
      throw new UnabilityToRetrieveGlobalRolesOfUserError(
        error.message,
        user.id
      );
    }

    const payload: TokenPayload = {
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
}
