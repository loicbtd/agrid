import { TokenPayload } from '../../domain/interfaces/token-payload.interface';
import { WhoamiResponseDto } from '@workspace/common/responses';
import { SigninRequestDto } from '@workspace/common/requests';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Logger } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { RegisterRequestDto } from '@workspace/common/requests';
import { Get, UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from '../../api/guards/jwt.guard';
import { JwtPayload } from '../../api/decorators/jwt-payload.decorator';

@ApiTags('identities')
@Controller('identities')
export class IdentitiesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger
  ) {}

  @Post('signin')
  @ApiOperation({ summary: 'Logs a user' })
  async signin(@Body() command: SigninRequestDto): Promise<any> {
    return await this.usersService.signin(command);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registers a user' })
  async register(@Body() command: RegisterRequestDto): Promise<void> {
    await this.usersService.register(command);
  }

  @Post('test')
  @ApiOperation({})
  test(): void {
    this.logger.log(1, 'test');
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('whoami')
  @ApiOperation({ summary: 'Gets who am I' })
  async whoami(
    @JwtPayload() payload: TokenPayload
  ): Promise<WhoamiResponseDto> {
    return await this.usersService.whoami(payload.userId);
  }
}
