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
import { StripeWebhookDataModel } from '../models/stripe-webhook-data.model';
import { WebhookError } from '../errors/webhook.error';
import { UnhandledStripeEventError } from '../errors/unhandled-stripe-event.error';

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
    stripeWebhookData: StripeWebhookDataModel
  ): Promise<void> {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        stripeWebhookData.payload,
        stripeWebhookData.signature,
        environment.stripeWebhookSecret
      );
    } catch (error: any) {
      throw new WebhookError(error.message);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      default:
       throw new UnhandledStripeEventError()
    }

    // // console.log(paymentIntent);
    // console.log(stripeSignature);
    // return null;
  }
}
