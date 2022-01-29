import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Inject, Injectable } from '@nestjs/common';
import { StripeConfigurationModel } from '@workspace/common/models';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { UnkownPlanError } from '../errors/unkown-plan.error';
import { UnabilityToCreatePaymentIntentWithStripeError } from '../errors/unability-to-create-payment-intent-with-stripe.error';
import { STRIPE } from '../constants/provider-names.constant';

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
    @Inject(STRIPE)
    private readonly stripe: Stripe
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

  async listenWebhook(
    stripeSignature: unknown,
    paymentIntent: unknown
  ): Promise<void> {
    console.log(this.stripe);

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(paymentIntent, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // // console.log(paymentIntent);
    // console.log(stripeSignature);
    // return null;
  }
}
