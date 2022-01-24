import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { Stripe } from 'stripe';
import { environment } from '../../../environments/environment';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import { StripeConfigurationModel } from '@workspace/common/models';
import { StripeService } from '../../domain/services/stripe.service';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('retrieveConfiguration')
  @ApiOperation({ summary: 'retrieves the configuration' })
  async retrieveConfiguration(): Promise<StripeConfigurationModel> {
    return await this.stripeService.retrieveConfiguration();
  }

  @Post('createPaymentIntentForPlan')
  @ApiOperation({ summary: 'creates a payment intent for a plan' })
  async createPaymentIntentForPlan(
    @Body()
    command: CreatePaymentIntentForPlanRequest
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripeService.createPaymentIntentForPlan(command);
  }
}
