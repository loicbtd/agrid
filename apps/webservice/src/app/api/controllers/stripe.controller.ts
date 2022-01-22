import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { Stripe } from 'stripe';
import { environment } from '../../../environments/environment';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  @Post('createPaymentIntentForPlan')
  @ApiOperation({ summary: 'creates a payment intent for a plan' })
  async createPaymentIntent(
    @Body()
    request: CreatePaymentIntentForPlanRequest
  ): Promise<Stripe.PaymentIntent> {
    return await new Stripe(
      environment.stripeSecretKey,
      null
    ).paymentIntents.create({
      payment_method_types: ['card'],
      amount: 1000,
      currency: 'eur',
    });
  }
}
