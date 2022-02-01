import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Refresh } from '../actions/jwt.actions';

@State<string | undefined>({
  name: 'JwtState',
})
@Injectable()
export class JwtState {
  @Action(Refresh)
  refresh(context: StateContext<string | undefined>, action: Refresh) {
    context.setState(action.jwt);
  }
}
