import { SigninResponse } from '@workspace/common/responses';
import { SigninRequest } from '@workspace/common/requests';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { apiRoutes } from '@workspace/common/constants';

@ApiTags(apiRoutes.identities.root)
@Controller(apiRoutes.identities.root)
export class IdentitiesController {
  constructor(private readonly usersService: UsersService) {}

  @Post(apiRoutes.identities.signin)
  @ApiOperation({ summary: 'logs a user' })
  async signin(@Body() command: SigninRequest): Promise<SigninResponse> {
    return await this.usersService.signin(command);
  }
}
