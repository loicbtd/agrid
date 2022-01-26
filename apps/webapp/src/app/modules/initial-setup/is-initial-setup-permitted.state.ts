import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Refresh } from './is-initial-setup-permitted.action';

@State<boolean>({
  name: IsInitialSetupPermittedState.name,
})
@Injectable()
export class IsInitialSetupPermittedState {
  @Action(Refresh)
  refresh(context: StateContext<boolean>, action: Refresh) {
    context.setState(action.isPermitted);
  }
}
