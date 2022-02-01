import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SubscriptionModel } from '../models/subscription.model';
import { SubscriptionState } from '../store/state/subscription.state';

@Injectable({
  providedIn: 'root',
})
export class UserInformationMustBeCompletedGuard implements CanActivate {
  constructor(private readonly store: Store) {}

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

    if (!subscribeState.firstname || subscribeState.firstname === '') {
      return false;
    }

    if (!subscribeState.lastname || subscribeState.lastname === '') {
      return false;
    }

    if (!subscribeState.email || subscribeState.email === '') {
      return false;
    }

    return true;
  }
}
