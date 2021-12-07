import { environment } from './../../../environments/environment';
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
  ): Promise<Stripe.Checkout.Session> {
    const stripe = new Stripe(environment.stripeSecretKey, null);

    return stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: 'TODO',
      cancel_url: 'TODO',
    });
  }
}
