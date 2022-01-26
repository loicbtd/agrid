import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SigninRequest } from '@workspace/common/requests';
import { SigninResponse } from '@workspace/common/responses';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { Refresh as RefreshMyProfile } from '../../global/store/actions/my-profile.actions';
import { Refresh as RefreshJwt } from '../../global/store/actions/jwt.actions';
import { UndefinedSigninResponseError } from '../../global/errors/undefined-signin-response.error';
import { apiRoutes } from '@workspace/common/constants';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async signin(command: SigninRequest): Promise<void> {
    const response = await lastValueFrom(
      this.httpClient.post<SigninResponse>(
        `${environment.webserviceOrigin}/${apiRoutes.identities.root}/${apiRoutes.identities.signin}`,
        command
      )
    );

    if (!response || !response.profile || !response.token) {
      throw new UndefinedSigninResponseError();
    }

    await lastValueFrom(
      this.store.dispatch(new RefreshMyProfile(response.profile))
    );

    await lastValueFrom(this.store.dispatch(new RefreshJwt(response.token)));
  }
}
