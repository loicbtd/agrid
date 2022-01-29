import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent {
  stepItems: MenuItem[] = [
    { label: 'Offre', routerLink: 'step-1' },
    { label: 'Informations', routerLink: 'step-2' },
    { label: 'Paiement', routerLink: 'step-3' },
    { label: 'Récapitulatif', routerLink: 'step-4' },
  ];
}
