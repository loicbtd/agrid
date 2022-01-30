import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SubscriptionRoutes } from './constants/subscription-route.constant';

@Component({
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent {
  stepItems: MenuItem[] = [
    { label: 'Offre', routerLink: SubscriptionRoutes.planSelection },
    { label: 'Conditions', routerLink: SubscriptionRoutes.legal },
    { label: 'Informations', routerLink: SubscriptionRoutes.userInformation },
    { label: 'Paiement', routerLink: SubscriptionRoutes.payment },
    { label: 'Récapitulatif', routerLink: SubscriptionRoutes.summary },
  ];
}
