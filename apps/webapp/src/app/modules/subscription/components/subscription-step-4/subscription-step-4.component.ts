import { Component, OnInit } from '@angular/core';
import { PaymentIntent } from '@stripe/stripe-js';

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

@Component({
  selector: 'app-subscription-step-4',
  templateUrl: './subscription-step-4.component.html',
  styleUrls: ['./subscription-step-4.component.scss'],
})
export class SubscriptionStep4Component implements OnInit {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly stripeConfigurationService: StripeConfigurationService,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly toastMessageService: ToastMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.stripeConfigurationService.refresh();

    const publishableKey = this.store.selectSnapshot<StripeConfigurationModel>(
      StripeConfigurationState
    ).publishableKey;

    throw new UndefinedStripePublishableKeyError();

    if (!publishableKey) {
      throw new UndefinedStripePublishableKeyError();
    }

    // const stripe = await loadStripe(publishableKey);
    // if (!stripe) {
    //   this.toastMessageService.showError(
    //     'Impossible de charger le service Stripe'
    //   );
    //   return;
    // }

    // const clientSecret = (
    //   await lastValueFrom(
    //     this.httpClient.post<PaymentIntent>(
    //       `${environment.webserviceOrigin}/stripe/createPaymentIntentForPlan`,
    //       {
    //         planId: '5e3683fa-f920-4c26-8e23-dde712e8fd8c',
    //       } as CreatePaymentIntentForPlanRequest
    //     )
    //   )
    // ).client_secret;

    // const elements = stripe?.elements({
    //   clientSecret: 'CLIENT_SECRET',
    // });
  }
}
