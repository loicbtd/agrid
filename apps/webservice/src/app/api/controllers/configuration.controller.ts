import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { ConfigurationService } from '../../domain/services/configuration.service';
import { ConfigurationModel } from '@workspace/common/models';

@ApiTags('configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('retrieve')
  @ApiOperation({ summary: 'retrieves the configuration' })
  async retrieve(): Promise<ConfigurationModel> {
    return await this.configurationService.retrieve();
  }
}
