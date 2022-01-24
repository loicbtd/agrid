import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { StripeConfigurationModel } from '@workspace/common/models';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { UnkownPlanError } from '../errors/unkown-plan.error';
import { UnabilityToCreatePaymentIntentWithStripeError } from '../errors/unability-to-create-payment-intent-with-stripe.error';

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
    let plan: PlanEntity;

    try {
      plan = await this.plansRepository.findOneOrFail({ id: command.planId });
    } catch (error: any) {
      throw new UnkownPlanError();
    }

    let paymentIntent: Stripe.PaymentIntent;

    try {
      paymentIntent = await new Stripe(
        environment.stripeSecretKey,
        null
      ).paymentIntents.create({
        payment_method_types: ['card'],
        amount: plan.price * 100,
        currency: 'eur',
      });
    } catch (error: any) {
      throw new UnabilityToCreatePaymentIntentWithStripeError(error.message);
    }

    return paymentIntent;
  }
}
