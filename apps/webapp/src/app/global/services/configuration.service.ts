import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationModel } from '@workspace/common/models';
import { Store } from '@ngxs/store';
import { Refresh } from '../store/actions/configuration.actions';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async get(): Promise<ConfigurationModel> {
    if (
      !this.store.selectSnapshot<ConfigurationModel>(
        (state: ConfigurationModel) => state
      )
    ) {
      await this.refresh();
    }

    return this.store.selectSnapshot<ConfigurationModel>(
      (state: ConfigurationModel) => state
    );
  }

  async refresh(): Promise<void> {
    const configuration = await lastValueFrom(
      this.httpClient.get<ConfigurationModel>(
        `${environment.webserviceOrigin}/configuration/retrieve`
      )
    );

    await lastValueFrom(this.store.dispatch(new Refresh(configuration)));
  }
}
