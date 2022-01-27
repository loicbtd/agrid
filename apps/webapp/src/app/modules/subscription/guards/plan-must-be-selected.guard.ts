import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { SubscribeRequest } from '@workspace/common/requests';
import { Observable } from 'rxjs';
import { SubscribeState } from '../store/state/subscribe.state';

@Injectable({
  providedIn: 'root',
})
export class PlanMustBeSelectedGuard implements CanActivate {
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
      this.store.selectSnapshot<SubscribeRequest>(SubscribeState);

    if (!subscribeState.planId || subscribeState.planId === '') {
      return false;
    }

    return true;
  }
}
