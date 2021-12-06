import { HttpService, Injectable } from '@nestjs/common';
import { Webinar } from 'domain/entities/webinar.entity';

@Injectable()
export class ExternalApiService {
  private readonly _API_GOUV_REVERSE: string =
    'https://nominatim.openstreetmap.org/reverse?format=jsonv2&';

  constructor(private http: HttpService) {}

  async getAddressWithCoord(webinar: Webinar): Promise<string> {
    const url = `
      ${this._API_GOUV_REVERSE}lon=${webinar.longitude}&lat=${webinar.latitude}
    `;
    let response = await this.http.get<JSON>(url).toPromise();
    let data = JSON.parse(JSON.stringify(response.data));
    return data.display_name ? data.display_name : '-';
  }
}
