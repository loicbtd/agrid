import { environment } from './../../../environments/environment';
import { RegisterRequest, SigninRequest } from '@workspace/common/requests';
import { TokenPayload } from '../../domain/interfaces/token-payload.interface';
import { EmailsService } from './emails.service';
import {
  SigninResponseDto,
  WhoamiResponseDto,
} from '@workspace/common/responses';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailTemplateEnumeration } from '../enumerations/email-template.emumeration';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService
  ) {}

  async signin(command: SigninRequest): Promise<SigninResponseDto> {
    const user = await this.usersRepository.findOne({ email: command.email });
    if (!user) {
      throw new BadRequestException();
    }

    if (!(await bcrypt.compare(command.password, user.password))) {
      throw new BadRequestException();
    }

    const payload: TokenPayload = { userId: user.id };

    return {
      token: this.jwtService.sign(payload),
      whoami: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  }

  async register(command: RegisterRequest): Promise<void> {
    const hashedPassword = await bcrypt.hash(command.password, 10);

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
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async whoami(userId: string): Promise<WhoamiResponseDto> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new BadRequestException();
    }

    return {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }
}
