import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';
import { MyProfileModel } from '@workspace/common/models';
import { Observable } from 'rxjs';
import { errorsRoutes } from '../../modules/errors/constants/errors-routes.constant';
import { appRoutes } from '../constants/app-route.constant';
import { JwtState } from '../store/state/jwt.state';
import { MyProfileState } from '../store/state/my-profile.state';

@Injectable({
  providedIn: 'root',
})
export class AdministratorGlobalRoleIsRequiredGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !this.store
        .selectSnapshot<MyProfileModel>(MyProfileState)
        .globalRoles?.includes(GlobalRoleEnumeration.Administrator)
    ) {
      return this.router.createUrlTree([
        appRoutes.errors,
        errorsRoutes.accessDenied,
      ]);
    }

    return true;
  }
}
