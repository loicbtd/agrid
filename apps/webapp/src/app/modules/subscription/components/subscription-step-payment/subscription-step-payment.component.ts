import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Stripe,
  StripeElements,
  StripePaymentElement,
} from '@stripe/stripe-js';
import { StripeConfigurationService } from '../../../../global/services/stripe-configuration.service';
import { Store } from '@ngxs/store';
import { SubscribeRequest } from '@workspace/common/requests';
import { StripeConfigurationModel } from '@workspace/common/models';
import { StripeConfigurationState } from '../../../../global/store/state/stripe-configuration.state';
import { loadStripe } from '@stripe/stripe-js';
import { UndefinedStripePublishableKeyError } from '../../../../global/errors/undefined-stripe-publishable-key.error';
import { ImpossibleToLoadStripeError } from '../../../../global/errors/impossible-to-load-stripe.error';
import { SubscriptionState } from '../../store/state/subscription.state';
import { SubscriptionService } from '../../../../global/services/subscription.service';

@Component({
  template: `
    <p-card styleClass="mt-2 mx-2">
      <div id="payment-element"></div>

      <div *ngIf="!paymentElement" class="flex w-100">
        <workspace-progress-spinner class="w-100 m-auto">
        </workspace-progress-spinner>
      </div>

      <p-button
        *ngIf="paymentElement"
        styleClass="w-full mt-4"
        (click)="pay()"
        label="Payer"
      ></p-button>
    </p-card>
  `,
})
export class SubscriptionStepPaymentComponent implements OnInit {
  paymentElement: StripePaymentElement;

  private stripe: Stripe | null;

  private stripeElements: StripeElements;

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly stripeConfigurationService: StripeConfigurationService,
    private readonly store: Store,
    private readonly changeDetectorRef: ChangeDetectorRef
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

    const planId =
      this.store.selectSnapshot<SubscribeRequest>(SubscriptionState).planId;

    if (!planId) {
      return;
    }

    const clientSecret =
      await this.subscriptionService.createPaymentIntentForPlanAndRetrieveClientSecre(
        planId
      );

    this.stripeElements = this.stripe.elements({
      clientSecret: clientSecret,
      locale: 'auto',
    });

    this.paymentElement = this.stripeElements.create('payment');

    this.paymentElement.mount('#payment-element');

    this.changeDetectorRef.detectChanges();
  }

  async pay() {
    if (!this.stripe) {
      return;
    }

    const paymentConfirmation = await this.stripe.confirmPayment({
      elements: this.stripeElements,
      redirect: 'if_required',
    });

    // const a = paymentConfirmation.paymentIntent.;

    await this.subscriptionService.subscribe();

    console.log(paymentConfirmation);
  }
}
