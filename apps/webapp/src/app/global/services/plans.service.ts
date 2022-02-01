import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlanEntity } from '@workspace/common/entities';
import { Refresh } from '../store/actions/plans.actions';
import { apiRoutes } from '@workspace/common/constants';
import {
  CreatePlanRequest,
  UpdatePlanRequest,
} from '@workspace/common/requests';

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

  update(id: string, command: UpdatePlanRequest) {
    return this.httpClient.put<PlanEntity>(
      `${environment.webserviceOrigin}/${apiRoutes.plans.root}/${id}`,
      command
    );
  }

  create(command: CreatePlanRequest) {
    return this.httpClient.post<PlanEntity>(
      `${environment.webserviceOrigin}/${apiRoutes.plans.root}/${apiRoutes.plans.create}`,
      command
    );
  }

  delete(id: string) {
    return this.httpClient.delete(
      `${environment.webserviceOrigin}/${apiRoutes.plans.root}/${id}`
    );
  }
}
