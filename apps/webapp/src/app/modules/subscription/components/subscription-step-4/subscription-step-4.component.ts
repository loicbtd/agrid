import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Stripe,
  loadStripe,
  StripeElementsOptions,
  PaymentIntent,
  StripeCardElementOptions,
} from '@stripe/stripe-js';
import { StripeFactoryService, StripeInstance } from 'ngx-stripe';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StripeConfigurationService } from 'apps/webapp/src/app/global/services/stripe-configuration.service';

@Component({
  selector: 'app-subscription-step-4',
  templateUrl: './subscription-step-4.component.html',
  styleUrls: ['./subscription-step-4.component.scss'],
})
export class SubscriptionStep4Component implements OnInit {
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  paymentRequestOptions = {
    country: 'ES',
    currency: 'eur',
    total: {
      label: 'Demo Total',
      amount: 1099,
    },
    requestPayerName: true,
    requestPayerEmail: true,
  };
  stripe: StripeInstance;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly fb: FormBuilder,
    private readonly stripeFactory: StripeFactoryService,
    private readonly stripeConfigurationService: StripeConfigurationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = this.stripeFactory.create(
      (await this.stripeConfigurationService.get()).publishableKey
    );
  }

  pay() {
    // this.stripeService
    //   .confirmPayment({
    //     elements: this.paymentElement.elements,
    //     confirmParams: {
    //       payment_method_data: {
    //         billing_details: {
    //           name: this.stripeTest?.get('name')?.value,
    //         },
    //       },
    //     },
    //     redirect: 'if_required',
    //   })
    //   .subscribe((result) => {
    //     this.paying = false;
    //     console.log('Result', result);
    //     if (result.error) {
    //       // Show error to your customer (e.g., insufficient funds)
    //       alert({ success: false, error: result.error.message });
    //     } else {
    //       // The payment has been processed!
    //       if (result?.paymentIntent?.status === 'succeeded') {
    //         // Show a success message to your customer
    //         alert({ success: true });
    //       }
    //     }
    //   });
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.httpClient.post<PaymentIntent>(
      `http://localhost:3333/subscriptions/subscribe`,
      { amount }
    );
  }
}
