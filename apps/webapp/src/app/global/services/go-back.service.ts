import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VisitedRoutesHistoryState } from '../store/state/visited-routes-history.state';

@Injectable({ providedIn: 'root' })
export class GoBackService {
  constructor(private readonly router: Router, private readonly store: Store) {}

  goBack() {
    const history = this.store.selectSnapshot<string[]>(
      VisitedRoutesHistoryState
    );

    if (history.length > 1) {
      this.router.navigateByUrl(history[history.length - 2]);
    }
  }
}
