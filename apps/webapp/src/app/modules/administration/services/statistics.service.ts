import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateStatisticsResponseDto } from '@workspace/common/responses';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private _httpClient: HttpClient) {}

  retrieveUsersCountOverTime(step: string) {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/statistics/retrieveUsersCountOverTime?step=${step}`
    );
  }

  retrieveSubscriptionCountOverTime(step: string) {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/statistics/retrieveSubscriptionsCountOverTime?step=${step}`
    );
  }

  retrieveUserCountOnCurrentMonth() {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/statistics/retrieveUserCountOnCurrentMonth`
    );
  }
}
