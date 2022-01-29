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
import { SubscribeState } from '../../store/state/subscribe.state';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  templateUrl: './subscription-step-3.component.html',
  styleUrls: ['./subscription-step-3.component.scss'],
})
export class SubscriptionStep3Component implements OnInit {
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
      this.store.selectSnapshot<SubscribeRequest>(SubscribeState).planId;

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
