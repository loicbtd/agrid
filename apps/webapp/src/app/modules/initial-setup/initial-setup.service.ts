import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PerformInitialSetupRequest } from '@workspace/common/requests';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { apiRoutes } from '@workspace/common/constants';
import { Refresh } from './is-initial-setup-permitted.action';

@Injectable({
  providedIn: 'root',
})
export class InitialSetupService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async refreshIfInitialSetupIsPermitted(): Promise<void> {
    const isPermitted = await lastValueFrom(
      this.httpClient.get<boolean>(
        `${environment.webserviceOrigin}/${apiRoutes.initialSetup.root}/${apiRoutes.initialSetup.isPermitted}`
      )
    );

    this.store.dispatch(new Refresh(isPermitted));
  }

  async performInitialSetup(
    command: PerformInitialSetupRequest
  ): Promise<boolean> {
    await lastValueFrom(
      this.httpClient.post(
        `${environment.webserviceOrigin}/${apiRoutes.initialSetup.root}/${apiRoutes.initialSetup.perform}`,
        command
      )
    );

    return true;
  }
}
