import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from '@workspace/common/constants';
import { UserProfileModel } from '@workspace/common/models';
import { UpdateProfileRequest } from '@workspace/common/requests';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _httpClient: HttpClient) {}

  retrieveAllProfiles() {
    return this._httpClient.get<UserProfileModel[]>(
      `${environment.webserviceOrigin}/${apiRoutes.profiles.root}/${apiRoutes.profiles.retrieveAllProfiles}`
    );
  }

  updateProfile(id: string, command: UpdateProfileRequest) {
    return this._httpClient.put<UserProfileModel>(
      `${environment.webserviceOrigin}/${apiRoutes.profiles.root}/${id}`,
      command
    );
  }
}
