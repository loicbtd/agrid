import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlanEntity } from '@workspace/common/entities';
import { Refresh } from '../store/actions/plans.actions';
import { apiRoutes } from '@workspace/common/constants';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async refresh(): Promise<void> {
    const plans = await lastValueFrom(
      this.httpClient.get<PlanEntity[]>(
        `${environment.webserviceOrigin}/${apiRoutes.plans.root}/${apiRoutes.plans.retrieve}`
      )
    );

    await lastValueFrom(this.store.dispatch(new Refresh(plans)));
  }
}
