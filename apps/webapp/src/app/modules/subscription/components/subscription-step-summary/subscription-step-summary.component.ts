import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { appRoutes } from 'apps/webapp/src/app/global/constants/app-route.constant';
import { lastValueFrom, Observable } from 'rxjs';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';
import { SubscriptionModel } from '../../models/subscription.model';
import { SubscriptionService } from '../../services/subscription.service';
import { UpdateSteps } from '../../store/actions/subscription.actions';
import { SubscriptionState } from '../../store/state/subscription.state';

@Component({
  template: `
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
            styleClass=" mt-4 ml-2 p-button-text"
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
            styleClass=" mt-4 ml-2 p-button-text"
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
            styleClass=" mt-4 ml-2 p-button-text"
            [routerLink]="['/showcase']"
            label="Annuler l'inscription"
          ></p-button>
        </div>
      </div>
    </div>
  `,
})
export class SubscriptionStepSummaryComponent implements OnInit {
  @Select(SubscriptionState) subscription$: Observable<SubscriptionModel>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subscriptionService: SubscriptionService,
    private readonly store: Store
  ) {}

  async ngOnInit() {
    await lastValueFrom(
      this.store.dispatch(new UpdateSteps(undefined, undefined))
    );
  }

  async retryToPay() {
    await this.subscriptionService.resetPayment();

    this.router.navigate(['..', subscriptionRoutes.payment], {
      relativeTo: this.activatedRoute,
    });
  }

  async quit() {
    this.router.navigate([appRoutes.showcase]);
  }
}
