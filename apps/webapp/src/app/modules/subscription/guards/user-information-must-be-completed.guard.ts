import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { appRoutes } from '../../../global/constants/app-route.constant';
import { errorsRoutes } from '../../errors/constants/errors-routes.constant';
import { SubscriptionModel } from '../models/subscription.model';
import { SubscriptionState } from '../store/state/subscription.state';

@Injectable({
  providedIn: 'root',
})
export class UserInformationMustBeCompletedGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const subscribeState =
      this.store.selectSnapshot<SubscriptionModel>(SubscriptionState);

    if (
      !subscribeState.firstname ||
      subscribeState.firstname === '' ||
      !subscribeState.lastname ||
      subscribeState.lastname === '' ||
      !subscribeState.email ||
      subscribeState.email === ''
    ) {
      return this.router.createUrlTree([
        appRoutes.errors,
        errorsRoutes.accessDenied,
      ]);
    }

    return true;
  }
}
