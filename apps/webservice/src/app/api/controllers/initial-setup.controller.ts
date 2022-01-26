import { SigninResponse } from '@workspace/common/responses';
import { SigninRequest } from '@workspace/common/requests';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { apiRoutes } from '@workspace/common/constants';
import { InitialSetupService } from '../../domain/services/initial-setup.service';

@ApiTags(apiRoutes.initialSetup.root)
@Controller(apiRoutes.initialSetup.root)
export class InitialSetupController {
  constructor(private readonly initialSetupService: InitialSetupService) {}

  @Get(apiRoutes.initialSetup.isPermitted)
  @ApiOperation({ summary: 'returns if initial setup is permitted' })
  async isAuthorized(): Promise<boolean> {
    return await this.initialSetupService.isPermitted();
  }

  @Post(apiRoutes.initialSetup.initialize)
  @ApiOperation({ summary: 'performs initial setup' })
  async initialize(@Body() command: SigninRequest): Promise<SigninResponse> {
    return await this.initialSetupService.initialize(command);
  }
}
