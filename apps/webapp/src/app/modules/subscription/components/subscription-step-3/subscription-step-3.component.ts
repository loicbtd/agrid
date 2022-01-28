import { Component, OnInit } from '@angular/core';
import { PaymentIntent, Stripe, StripeElements } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { StripeConfigurationService } from '../../../../global/services/stripe-configuration.service';
import { Store } from '@ngxs/store';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentIntentForPlanRequest } from '@workspace/common/requests';
import { StripeConfigurationModel } from '@workspace/common/models';
import { StripeConfigurationState } from '../../../../global/store/state/stripe-configuration.state';
import { loadStripe } from '@stripe/stripe-js';
import { ToastMessageService } from '../../../../global/services/toast-message.service';
import { UndefinedStripePublishableKeyError } from '../../../../global/errors/undefined-stripe-publishable-key.error';
import { ImpossibleToLoadStripeError } from '../../../../global/errors/impossible-to-load-stripe.error';
import { UndefinedStripeClientSecretError } from '../../../../global/errors/undefined-stripe-client-secret.error';
import { PlansService } from '../../../../global/services/plans.service';

@Component({
  templateUrl: './subscription-step-3.component.html',
  styleUrls: ['./subscription-step-3.component.scss'],
})
export class SubscriptionStep3Component implements OnInit {
  private stripe: Stripe | null;

  private stripeElements: StripeElements;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly stripeConfigurationService: StripeConfigurationService,
    private readonly plansService: PlansService,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly toastMessageService: ToastMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.stripeConfigurationService.refresh();

    const publishableKey = this.store.selectSnapshot<StripeConfigurationModel>(
      StripeConfigurationState
    ).publishableKey;

    if (!publishableKey) {
      throw new UndefinedStripePublishableKeyError();
    }

    this.stripe = await loadStripe(publishableKey);
    if (!this.stripe) {
      throw new ImpossibleToLoadStripeError();
    }

    const clientSecret = (
      await lastValueFrom(
        this.httpClient.post<PaymentIntent>(
          `${environment.webserviceOrigin}/stripe/createPaymentIntentForPlan`,
          {
            planId: '5e3683fa-f920-4c26-8e23-dde712e8fd8c',
          } as CreatePaymentIntentForPlanRequest
        )
      )
    ).client_secret;

    if (!clientSecret) {
      throw new UndefinedStripeClientSecretError();
    }

    this.stripeElements = this.stripe.elements({
      clientSecret: clientSecret,
      locale: 'fr',
    });

    const paymentElement = this.stripeElements.create('payment', {
      business: { name: 'Agrid' },
      fields: {
        billingDetails: {
          name: 'auto',
          email: 'auto',
        },
      },
    });

    paymentElement.mount('#payment-element');
  }

  async confirmPayment() {
    if (!this.stripe) {
      return;
    }

    const paymentConfirmation = await this.stripe.confirmPayment({
      elements: this.stripeElements,
      redirect: 'if_required',
    });

    console.log(paymentConfirmation);
  }
}
