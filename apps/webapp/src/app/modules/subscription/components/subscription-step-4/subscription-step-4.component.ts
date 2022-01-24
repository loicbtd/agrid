import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Stripe, loadStripe, StripeElementsOptions, PaymentIntent } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscription-step-4',
  templateUrl: './subscription-step-4.component.html',
  styleUrls: ['./subscription-step-4.component.scss'],
})
export class SubscriptionStep4Component implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  stripeTest = this.fb.group({
    name: ['Angular v12', [Validators.required]],
    amount: [1109, [Validators.required, Validators.pattern(/\d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
  };

  paying = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  async ngOnInit(): Promise<void> {
    this.createPaymentIntent(this.stripeTest.get('amount')?.value).subscribe(
      (pi) => {
        // this.elementsOptions.clientSecret = pi.client_secret;
      }
    );
  }

  pay() {
    if (this.stripeTest.valid) {
      this.paying = true;
      this.stripeService
        .confirmPayment({
          elements: this.paymentElement.elements,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: this.stripeTest?.get('name')?.value,
              },
            },
          },
          redirect: 'if_required',
        })
        .subscribe((result) => {
          this.paying = false;
          console.log('Result', result);
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert({ success: false, error: result.error.message });
          } else {
            // The payment has been processed!
            if (result?.paymentIntent?.status === 'succeeded') {
              // Show a success message to your customer
              alert({ success: true });
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `http://localhost:3333/subscriptions/subscribe`,
      { amount }
    );
  }
}
