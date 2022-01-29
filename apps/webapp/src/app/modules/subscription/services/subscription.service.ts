import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaymentIntent } from '@stripe/stripe-js';
import { apiRoutes } from '@workspace/common/constants';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { UndefinedStripeClientSecretError } from '../../../global/errors/undefined-stripe-client-secret.error';
import { UpdatePaymentIntentId } from '../store/actions/subscribe.actions';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async createPaymentIntentForPlanAndRetrieveClientSecre(planId: string): Promise<string> {
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
