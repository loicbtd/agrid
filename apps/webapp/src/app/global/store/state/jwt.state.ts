import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Refresh } from '../actions/jwt.actions';

@State<string>({
  name: JwtState.name,
})
@Injectable()
export class JwtState {
  @Action(Refresh)
  refresh(context: StateContext<string>, action: Refresh) {
    context.setState(action.jwt);
  }
}
