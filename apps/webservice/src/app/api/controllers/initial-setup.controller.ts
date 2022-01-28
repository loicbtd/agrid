import { PerformInitialSetupRequest } from '@workspace/common/requests';
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

  @Post(apiRoutes.initialSetup.perform)
  @ApiOperation({ summary: 'performs initial setup' })
  async perform(@Body() command: PerformInitialSetupRequest): Promise<void> {
    return await this.initialSetupService.perform(command);
  }
}
