import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Remember } from '../actions/visited-routes-history.actions';

@State<string[]>({
  name: 'VisitedRoutesHistoryState',
  defaults: [],
})
@Injectable()
export class VisitedRoutesHistoryState {
  @Action(Remember)
  remember(context: StateContext<string[]>, action: Remember) {
    if (context.getState().length > 9) {
      context.setState([...context.getState().slice(-9), action.url]);
    } else {
      context.setState([...context.getState(), action.url]);
    }
  }
}
