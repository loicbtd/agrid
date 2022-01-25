import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { StripeConfigurationModel } from '@workspace/common/models';
import { Refresh } from '../actions/stripe-configuration.actions';

@State<StripeConfigurationModel>({
  name: StripeConfigurationState.name,
  defaults: undefined,
})
@Injectable()
export class StripeConfigurationState {
  @Action(Refresh)
  refresh(context: StateContext<StripeConfigurationModel>, action: Refresh) {
    context.setState(action.stripeConfiguration);
  }
}
