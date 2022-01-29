import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { subscriptionRoutes } from './constants/subscription-route.constant';

@Component({
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent {
  stepItems: MenuItem[] = [
    { label: 'Offre', routerLink: subscriptionRoutes.planSelection },
    { label: 'Conditions', routerLink: subscriptionRoutes.legal },
    { label: 'Informations', routerLink: subscriptionRoutes.userInformation },
    { label: 'Paiement', routerLink: subscriptionRoutes.payment },
    { label: 'Récapitulatif', routerLink: subscriptionRoutes.summary },
  ];
}
