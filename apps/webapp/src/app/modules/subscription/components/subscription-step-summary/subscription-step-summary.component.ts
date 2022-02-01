import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';
import { SubscriptionModel } from '../../models/subscription.model';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionState } from '../../store/state/subscription.state';

@Component({
  template: `
    <p-card styleClass="mt-2 mx-2">
      <div
        class="flex w-full"
        [ngSwitch]="(subscription$ | async)?.paymentStatus"
      >
        <div *ngSwitchCase="'succeeded'" class="flex flex-column w-full">
          <div class="mx-auto">
            Le paiement a bien été confirmé. Vous recevrez un courriel dans
            quelques instants.
          </div>
          <div class="mx-auto">
            <p-button
              styleClass=" mt-4 ml-2 p-button-secondary p-button-text"
              [routerLink]="['/showcase']"
              label="Retour à la page d'accueil"
            ></p-button>
          </div>
        </div>
        <div *ngSwitchCase="'processing'" class="flex flex-column w-full">
          <div class="mx-auto">
            Le paiement est en cours. Vous recevrez un courriel dès que votre
            abonnement sera effectif.
          </div>
          <div class="mx-auto">
            <p-button
              styleClass=" mt-4 ml-2 p-button-secondary p-button-text"
              [routerLink]="['/showcase']"
              label="Retour à la page d'accueil"
            ></p-button>
          </div>
        </div>
        <div *ngSwitchDefault class="flex flex-column w-full">
          <div class="mx-auto">Le paiement a échoué.</div>
          <div class="mx-auto">
            <p-button
              styleClass="mt-4"
              (click)="retryToPay()"
              label="Retour au paiement"
            ></p-button>
            <p-button
              styleClass=" mt-4 ml-2 p-button-secondary p-button-text"
              [routerLink]="['/showcase']"
              label="Annuler l'inscription"
            ></p-button>
          </div>
        </div>
      </div>
    </p-card>
  `,
})
export class SubscriptionStepSummaryComponent {
  @Select(SubscriptionState) subscription$: Observable<SubscriptionModel>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subscriptionService: SubscriptionService
  ) {}

  async retryToPay() {
    await this.subscriptionService.resetPayment();

    this.router.navigate(['..', subscriptionRoutes.payment], {
      relativeTo: this.activatedRoute,
    });
  }
}
