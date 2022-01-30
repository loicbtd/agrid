import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from '@workspace/common/constants';
import { environment } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { InitiateSubscriptionRequest } from '@workspace/common/requests';
import { lastValueFrom } from 'rxjs';
import { UndefinedStripeClientSecretError } from '../../../global/errors/undefined-stripe-client-secret.error';
import { Store } from '@ngxs/store';
import { StripeConfigurationModel } from '@workspace/common/models';
import { StripeConfigurationState } from '../../../global/store/state/stripe-configuration.state';
import { UndefinedStripePublishableKeyError } from '../../../global/errors/undefined-stripe-publishable-key.error';
import { ImpossibleToLoadStripeError } from '../../../global/errors/impossible-to-load-stripe.error';
import { SubscriptionState } from '../store/state/subscription.state';
import { SubscriptionModel } from '../models/subscription.model';
import { InitiateSubscriptionResponse } from '@workspace/common/responses';
import { StripeConfigurationService } from '../../../global/services/stripe-configuration.service';
import { UpdatePaymentStatus } from '../store/actions/subscription.actions';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store,
    private readonly stripeConfiturationService: StripeConfigurationService
  ) {}

  async initiateSubscription(): Promise<[Stripe, StripeElements]> {
    await this.stripeConfiturationService.refresh();

    const publishableKey = this.store.selectSnapshot<StripeConfigurationModel>(
      StripeConfigurationState
    ).publishableKey;

    if (!publishableKey) {
      throw new UndefinedStripePublishableKeyError();
    }

    const stripe = await loadStripe(publishableKey);

    if (!stripe) {
      throw new ImpossibleToLoadStripeError();
    }

    const subscription: SubscriptionModel =
      this.store.selectSnapshot<SubscriptionModel>(SubscriptionState);

    const response = await lastValueFrom(
      this.httpClient.post<InitiateSubscriptionResponse>(
        `${environment.webserviceOrigin}/${apiRoutes.subscriptions.root}/${apiRoutes.subscriptions.initiateSubscription}`,
        {
          planId: subscription.planId,
          email: subscription.email,
          firstname: subscription.firstname,
          lastname: subscription.lastname,
        } as InitiateSubscriptionRequest
      )
    );

    if (!response.clientSecret) {
      throw new UndefinedStripeClientSecretError();
    }

    const stripeElements = stripe.elements({
      clientSecret: response.clientSecret,
      appearance: {
        theme: 'stripe',
      },
      locale: 'auto',
    });

    return [stripe, stripeElements];
  }

  async confirmPayment(stripe: Stripe, stripeElements: StripeElements) {
    const response = await stripe.confirmPayment({
      elements: stripeElements,
      redirect: 'if_required',
    });

    await lastValueFrom(
      this.store.dispatch(
        new UpdatePaymentStatus(response.paymentIntent?.status)
      )
    );
  }

  async resetPayment() {
    await lastValueFrom(this.store.dispatch(new UpdatePaymentStatus(null)));
  }
}
