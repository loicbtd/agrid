import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from '@workspace/common/constants';
import { PlanEntity, SubscriptionEntity } from '@workspace/common/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private readonly httpClient: HttpClient) {}

  async getAvailablePlans(): Promise<PlanEntity[]> {
    return [
      {
        id: '1',
        name: 'Basique',
        price: 2,
        supportType: { id: '1', name: 'Standard' },
      },
      {
        id: '2',
        name: 'Premium',
        price: 8,
        supportType: { id: '1', name: 'Premium' },
      },
      {
        id: '3',
        name: 'Premium +',
        price: 20,
        supportType: { id: '1', name: 'Premium +' },
      },
    ];
  }
  retrieveMySubscriptions() {
    return this.httpClient.get<SubscriptionEntity[]>(
      `${environment.webserviceOrigin}/${apiRoutes.subscriptions.root}/${apiRoutes.subscriptions.retrieveMySubscriptions}`
    );
  }
}
