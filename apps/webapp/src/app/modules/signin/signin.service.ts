import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SigninRequest } from '@workspace/common/requests';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  async signin(command: SigninRequest): Promise<void> {
    // const response = await this.http
    //   .post<SigninResponseDto>(
    //     `${environment.apiBaseUrl}/identities/signin`,
    //     command
    //   )
    //   .toPromise();
    // LocalstorageManager.update(LOCALSTORAGE_KEYS.TOKEN, response.token);
    // LocalstorageManager.update(LOCALSTORAGE_KEYS.WHOAMI, response.whoami);
    // this.whoamiStore.whoami = response.whoami;
  }
}
