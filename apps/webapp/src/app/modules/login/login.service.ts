import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlanEntity } from '@workspace/common/entities';

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
        `${environment.webserviceOrigin}/identities/login`
      )
    );

    await lastValueFrom(this.store.dispatch(new Refresh(plans)));
  }
}
