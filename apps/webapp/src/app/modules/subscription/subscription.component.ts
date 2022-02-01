import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { subscriptionRoutes } from './constants/subscription-routes.constant';
import { SubscriptionModel } from './models/subscription.model';
import { Reset } from './store/actions/subscription.actions';
import { SubscriptionState } from './store/state/subscription.state';

@Component({
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent implements OnDestroy {
  @Select(SubscriptionState) subscription$: Observable<SubscriptionModel>;

  stepItems: MenuItem[] = [
    { label: 'Offre', routerLink: subscriptionRoutes.planSelection },
    { label: 'Conditions', routerLink: subscriptionRoutes.legal },
    { label: 'Informations', routerLink: subscriptionRoutes.userInformation },
    { label: 'Paiement', routerLink: subscriptionRoutes.payment },
    { label: 'Récapitulatif', routerLink: subscriptionRoutes.summary },
  ];

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.store.dispatch(new Reset());
  }
}
