import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { StripeService } from '../../domain/services/stripe.service';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('retrievePublishableKey')
  @ApiOperation({ summary: 'retrieves the stripe publishable key' })
  async retrievePublishableKey(): Promise<string> {
    return await this.stripeService.retrievePublishableKey();
  }
}
