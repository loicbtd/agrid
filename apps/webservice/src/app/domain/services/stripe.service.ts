import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { StripeConfigurationModel } from '@workspace/common/models';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>
  ) {}

  async retrieveConfiguration(): Promise<StripeConfigurationModel> {
    if (!environment.stripePublishableKey) {
      throw new StripePublishableKeyNotFoundError();
    }

    return { publishableKey: environment.stripePublishableKey };
  }

  async createPaymentIntentForPlan(
    command: CreatePaymentIntentForPlanRequest
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
