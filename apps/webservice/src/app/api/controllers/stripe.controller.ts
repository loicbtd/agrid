import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, HttpStatus, Headers } from '@nestjs/common';
import { Body, Get, HttpCode, Post } from '@nestjs/common/decorators';
import { Stripe } from 'stripe';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import { StripeConfigurationModel } from '@workspace/common/models';
import { StripeService } from '../../domain/services/stripe.service';
import { apiRoutes } from '@workspace/common/constants';

@ApiTags(apiRoutes.stripe.root)
@Controller(apiRoutes.stripe.root)
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get(apiRoutes.stripe.retrieveConfiguration)
  @ApiOperation({ summary: 'retrieves the configuration' })
  async retrieveConfiguration(): Promise<StripeConfigurationModel> {
    return await this.stripeService.retrieveConfiguration();
  }

  @Post(apiRoutes.stripe.createPaymentIntentForPlan)
  @ApiOperation({ summary: 'creates a payment intent for a plan' })
  async createPaymentIntentForPlan(
    @Body()
    command: CreatePaymentIntentForPlanRequest
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripeService.createPaymentIntentForPlan(command);
  }

  @Post(apiRoutes.stripe.listenWebhook)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'listens Stripe webhook' })
  async listenWebhook(
    @Headers('stripe-signature') stripeSignature: any,
    @Body() paymentIntent: Stripe.PaymentIntent
  ): Promise<void> {
    await this.stripeService.listenWebhook(stripeSignature, paymentIntent);
  }
}
