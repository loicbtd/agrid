import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportRequest } from '@workspace/common/requests';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _httpClient: HttpClient) {}

  sendContactMail(command: SupportRequest) {
    return this._httpClient.post(
      `${environment.webserviceOrigin}/support/request`,
      command
    );
  }
}
