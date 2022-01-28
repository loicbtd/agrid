import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockUiService {
  private readonly uiBlocked = new BehaviorSubject<boolean>(false);

  public get $uiBlocked() {
    return this.uiBlocked.asObservable();
  }

  public blockUi() {
    this.uiBlocked.next(true);
  }

  public unBlockUi() {
    this.uiBlocked.next(false);
  }
}
