import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Inject, Injectable } from '@nestjs/common';
import { StripeConfigurationModel } from '@workspace/common/models';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
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

    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     // const paymentIntent = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   default:
    //     throw new UnhandledStripeEventError();
    // }
  }
}
