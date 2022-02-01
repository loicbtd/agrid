import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { appRoutes } from '../constants/app-route.constant';
import { Refresh } from '../store/actions/jwt.actions';

@Injectable({ providedIn: 'root' })
export class SignoutService {
  constructor(private readonly router: Router, private readonly store: Store) {}

  signout() {
    this.store.dispatch(new Refresh(undefined));
    this.router.navigate([`/${appRoutes.showcase}`]);
  }
}
