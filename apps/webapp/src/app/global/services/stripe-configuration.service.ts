import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Refresh } from '../store/actions/stripe-configuration.actions';
import { StripeConfigurationState } from '../store/state/stripe-configuration.state';
import { StripeConfigurationModel } from '@workspace/common/models';

@Injectable({
  providedIn: 'root',
})
export class StripeConfigurationService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async get(): Promise<StripeConfigurationModel> {
    if (
      !this.store.selectSnapshot<StripeConfigurationModel>(
        StripeConfigurationState
      )
    ) {
      await this.refresh();
    }

    return this.store.selectSnapshot<StripeConfigurationModel>(
      StripeConfigurationState
    );
  }

  async refresh(): Promise<void> {
    const configuration = await lastValueFrom(
      this.httpClient.get<StripeConfigurationModel>(
        `${environment.webserviceOrigin}/stripeConfiguration/retrieve`
      )
    );

    await lastValueFrom(this.store.dispatch(new Refresh(configuration)));
  }
}
