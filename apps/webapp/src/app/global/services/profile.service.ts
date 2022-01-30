import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { apiRoutes } from '@workspace/common/constants';
import { MyProfileModel, UserProfileModel } from '@workspace/common/models';
import { UpdateProfileRequest } from '@workspace/common/requests';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Refresh } from '../store/actions/my-profile.actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async refresh(): Promise<void> {
    const myprofile = await lastValueFrom(
      this.httpClient.get<MyProfileModel>(
        `${environment.webserviceOrigin}/${apiRoutes.profiles.root}/${apiRoutes.profiles.retrieveMyProfile}`
      )
    );

    await lastValueFrom(this.store.dispatch(new Refresh(myprofile)));
  }

  retrieveAllProfiles() {
    return this.httpClient.get<UserProfileModel[]>(
      `${environment.webserviceOrigin}/${apiRoutes.profiles.root}/${apiRoutes.profiles.retrieveAllProfiles}`
    );
  }

  updateProfile(id: string, command: UpdateProfileRequest) {
    return this.httpClient.put<UserProfileModel>(
      `${environment.webserviceOrigin}/${apiRoutes.profiles.root}/${id}`,
      command
    );
  }

  updateMyProfile(command: UpdateProfileRequest) {
    return this.httpClient.post<MyProfileModel>(
      `${environment.webserviceOrigin}/${apiRoutes.profiles.root}/${apiRoutes.profiles.updateMyProfile}`,
      command
    );
  }
}
