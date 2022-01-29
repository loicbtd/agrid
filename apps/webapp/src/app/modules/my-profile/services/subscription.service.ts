import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from '@workspace/common/constants';
import { SubscriptionEntity } from '@workspace/common/entities';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private httpClient: HttpClient) {}
  retrieveMySubscriptions() {
    return this.httpClient.get<SubscriptionEntity[]>(
      `${environment.webserviceOrigin}/${apiRoutes.subscriptions.root}/${apiRoutes.subscriptions.retrieveMySubscriptions}`
    );
  }
}
