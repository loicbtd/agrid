import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private readonly _httpClient: HttpClient) {}

  retrieveStripePublishableKey() {
    return this._httpClient.get(
      `${environment.webserviceOrigin}/stripe/retrievePublishableKey`
    );
  }
}
