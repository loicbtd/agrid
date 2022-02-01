import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { JwtState } from '../store/state/jwt.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes(environment.webserviceOrigin)) {
      return next.handle(request);
    }

    const jwt = this.store.selectSnapshot<string>(JwtState);

    if (!jwt) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return next.handle(request);
  }
}
