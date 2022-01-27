import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiRoutes } from '@workspace/common/constants';
import { DateStatisticsResponseDto } from '@workspace/common/responses';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private _httpClient: HttpClient) {}

  retrieveUsersCountOverTime(step: string) {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/${apiRoutes.statistics.root}/${apiRoutes.statistics.retrieveUsersCountOverTime}?step=${step}`
    );
  }

  retrieveSubscriptionCountOverTime(step: string) {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/${apiRoutes.statistics.root}/${apiRoutes.statistics.retrieveSubscriptionsCountOverTime}?step=${step}`
    );
  }

  retrieveUserCountOnCurrentMonth() {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/${apiRoutes.statistics.root}/${apiRoutes.statistics.retrieveUserCountOnCurrentMonth}`
    );
  }

  retrieveSalesCountOverTime(step: string) {
    return this._httpClient.get<DateStatisticsResponseDto[]>(
      `${environment.webserviceOrigin}/${apiRoutes.statistics.root}/${apiRoutes.statistics.retrieveSalesCountOverTime}?step=${step}`
    );
  }
}
