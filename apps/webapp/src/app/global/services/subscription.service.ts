import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from '@workspace/common/constants';
import { environment } from '../../../environments/environment';
import { PaymentIntent } from '@stripe/stripe-js';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import { lastValueFrom } from 'rxjs';
import { UndefinedStripeClientSecretError } from '../errors/undefined-stripe-client-secret.error';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private readonly httpClient: HttpClient) {}

  async createPaymentIntentForPlanAndRetrieveClientSecre(
    planId: string
  ): Promise<string> {
    const paymentIntent = await lastValueFrom(
      this.httpClient.post<PaymentIntent>(
        `${environment.webserviceOrigin}/${apiRoutes.stripe.root}/${apiRoutes.stripe.createPaymentIntentForPlan}`,
        {
          planId: planId,
        } as CreatePaymentIntentForPlanRequest
      )
    );

    if (!paymentIntent.client_secret) {
      throw new UndefinedStripeClientSecretError();
    }

    // this.store.dispatch(new UpdatePaymentIntentId(paymentIntent.))

    return paymentIntent.client_secret;
  }

  async subscribe() {
    return;
  }
}
