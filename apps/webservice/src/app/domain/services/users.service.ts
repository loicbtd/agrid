import { environment } from './../../../environments/environment';
import { SigninRequestDto } from '@workspace/common/requests';
import { TokenPayload } from '../../domain/interfaces/token-payload.interface';
import { EmailsService } from './emails.service';
import { RegisterRequestDto } from '@workspace/common/requests';
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
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private emailsService: EmailsService
  ) {}

  async signin(command: SigninRequestDto): Promise<SigninResponseDto> {
    const user = await this.userRepository.findOne({ email: command.email });
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

  async register(command: RegisterRequestDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(command.password, 10);

    try {
      await this.userRepository.insert({
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
        `[${environment.applicationName}] Welcome !`
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async whoami(userId: string): Promise<WhoamiResponseDto> {
    const user = await this.userRepository.findOne(userId);
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