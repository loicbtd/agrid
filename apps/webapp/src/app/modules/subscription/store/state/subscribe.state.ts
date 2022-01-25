import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { StripeConfigurationModel } from '@workspace/common/models';
import { Refresh } from '../actions/subscribe.actions';
import { SubscribeRequest } from '@workspace/common/requests';

@State<SubscribeRequest>({
  name: SubscribeState.name,
  defaults: {
    email: '',
    firstname: '',
    lastname: '',
    planId: '',
    stripeCardToken: '',
  },
})
@Injectable()
export class SubscribeState {
  @Action(Refresh)
  refresh(context: StateContext<SubscribeRequest>, action: Refresh) {
    context.setState(action.subscribeRequest);
  }
}
