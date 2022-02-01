import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  template: `
    <p-card styleClass="mt-2 mx-2">
      <div [hidden]="!stripeElements" id="payment-element"></div>

      <div *ngIf="!stripeElements" class="flex w-100">
        <workspace-progress-spinner class="w-100 m-auto">
        </workspace-progress-spinner>
      </div>

      <p-button
        *ngIf="stripeElements"
        styleClass="w-full mt-4"
        (click)="pay()"
        label="Payer"
      ></p-button>
    </p-card>
  `,
})
export class SubscriptionStepPaymentComponent implements OnInit {
  private stripe: Stripe;

  public stripeElements: StripeElements;

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    [this.stripe, this.stripeElements] =
      await this.subscriptionService.initiateSubscription();

    this.stripeElements.create('payment').mount('#payment-element');

    this.changeDetectorRef.detectChanges();
  }

  async pay() {
    await this.subscriptionService.confirmPayment(
      this.stripe,
      this.stripeElements
    );

    this.router.navigate(['..', subscriptionRoutes.summary], {
      relativeTo: this.activatedRoute,
    });
  }
}
