import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { StripeConfigurationService } from '../../domain/services/stripe-configuration.service';
import { StripeConfigurationModel } from '@workspace/common/models';

@ApiTags('stripeConfiguration')
@Controller('stripeConfiguration')
export class StripeConfigurationController {
  constructor(
    private readonly stripeConfigurationService: StripeConfigurationService
  ) {}

  @Get('retrieve')
  @ApiOperation({ summary: 'retrieves the stripe configuration' })
  async retrieve(): Promise<StripeConfigurationModel> {
    return await this.stripeConfigurationService.retrieve();
  }
}
