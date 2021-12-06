import { SigninRequestDto } from './../../api/requests/signin.request.dto';
import { TokenPayload } from 'domain/interfaces/token-payload.interface';
import { EmailsService } from './emails.service';
import { RegisterRequestDto } from '../../api/requests/register.request.dto';
import { SigninResponseDto } from '../../api/responses/signin.response.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'domain/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { WhoamiResponseDto } from 'api/responses/whoami.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private emailsService: EmailsService,
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

    return new SigninResponseDto({
      token: this.jwtService.sign(payload),
      whoami: new WhoamiResponseDto({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      }),
    });
  }

  async register(command: RegisterRequestDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(command.password, 10);

    try {
      await this.userRepository.insert(
        new User({
          email: command.email,
          password: hashedPassword,
          firstname:
            command.firstname.charAt(0).toUpperCase() +
            command.firstname.slice(1),
          lastname: command.lastname.toUpperCase(),
        }),
      );
    } catch (error) {
      throw new ConflictException();
    }

    this.emailsService.sendWelcomeEmailTo(command.email, command.firstname);
  }

  async whoami(userId: string): Promise<WhoamiResponseDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new BadRequestException();
    }

    return new WhoamiResponseDto({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }
}
