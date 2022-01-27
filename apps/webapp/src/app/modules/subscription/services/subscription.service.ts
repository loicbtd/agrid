import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlanEntity } from '@workspace/common/entities';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

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
}
