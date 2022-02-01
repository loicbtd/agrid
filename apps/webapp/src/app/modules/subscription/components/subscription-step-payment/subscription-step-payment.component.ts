import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { lastValueFrom } from 'rxjs';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';
import { SubscriptionService } from '../../services/subscription.service';
import { UpdateSteps } from '../../store/actions/subscription.actions';

@Component({
  template: `
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
  `,
})
export class SubscriptionStepPaymentComponent implements OnInit {
  private stripe: Stripe;

  public stripeElements: StripeElements;

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}

  async ngOnInit(): Promise<void> {
    [this.stripe, this.stripeElements] =
      await this.subscriptionService.initiateSubscription();

    this.stripeElements.create('payment').mount('#payment-element');

    this.changeDetectorRef.detectChanges();

    await lastValueFrom(
      this.store.dispatch(
        new UpdateSteps(subscriptionRoutes.userInformation, subscriptionRoutes.summary)
      )
    );
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
