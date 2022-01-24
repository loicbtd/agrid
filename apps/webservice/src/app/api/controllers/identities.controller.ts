import {
  SigninResponseDto,
  WhoamiResponseDto,
} from '@workspace/common/responses';
import { SigninRequest } from '@workspace/common/requests';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { RegisterRequest } from '@workspace/common/requests';
import { Get, UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from '../../api/guards/jwt.guard';
import { JwtPayload } from '../../api/decorators/jwt-payload.decorator';
import { TokenPayload } from '../../domain/models/token-payload.model';

@ApiTags('identities')
@Controller('identities')
export class IdentitiesController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  @ApiOperation({ summary: 'logs a user' })
  async signin(@Body() command: SigninRequest): Promise<SigninResponseDto> {
    return await this.usersService.signin(command);
  }

  @Post('register')
  @ApiOperation({ summary: 'registers a user' })
  async register(@Body() command: RegisterRequest): Promise<void> {
    await this.usersService.register(command);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('whoami')
  @ApiOperation({ summary: 'gets who am I' })
  async whoami(
    @JwtPayload() payload: TokenPayload
  ): Promise<WhoamiResponseDto> {
    return await this.usersService.whoami(payload.userId);
  }
}
