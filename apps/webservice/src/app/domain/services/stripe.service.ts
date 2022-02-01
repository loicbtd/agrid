import { StripePublishableKeyNotFoundError } from '../errors/stripe-publishable-key-not-found.error';
import { environment } from '../../../environments/environment';
import { Inject, Injectable } from '@nestjs/common';
import { StripeConfigurationModel } from '@workspace/common/models';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { STRIPE } from '../constants/provider-names.constant';
import { StripeWebhookDataModel } from '../models/stripe-webhook-data.model';
import { WebhookError } from '../errors/webhook.error';
import { UnhandledStripeEventError } from '../errors/unhandled-stripe-event.error';
import { EmailsService } from './emails.service';
@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscription: Repository<SubscriptionEntity>,
    @Inject(STRIPE)
    private readonly stripe: Stripe,
    private readonly emailService: EmailsService
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

    switch (event.type) {
      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        console.log(invoice);

        break;

      case 'invoice.payment_failed':
        break;
      case 'customer.subscription.deleted':
        break;
      default:
        throw new UnhandledStripeEventError();
    }
  }
}
