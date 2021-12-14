import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactRequestDto } from '@workspace/common/requests';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _httpClient: HttpClient) {}

  sendContactMail(command: ContactRequestDto) {
    return this._httpClient.post(
      `${environment.webserviceOrigin}/support/sendsMail`,
      command
    );
  }
}
