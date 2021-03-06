import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngxs/store';
import { Remember } from '../store/actions/visited-routes-history.actions';

@Injectable({ providedIn: 'root' })
export class VisitedRoutesHistoryService {
  constructor(private readonly router: Router, private readonly store: Store) {
    this.store.dispatch(new Remember(this.router.url));

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(new Remember(event.url));
      }
    });
  }
}
