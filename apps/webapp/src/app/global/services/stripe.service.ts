import { environment } from './../../../../../webservice/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly _httpClient: HttpClient) {}

  async retrievePublishableKey() {
    return await this._httpClient
      .get(
        `${environment.protocol}://${environment.host}:${environment.port}/stripe/retrievePublishableKey`
      )
      .toPromise();
  }
}
