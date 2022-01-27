import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SubscribeRequest } from '@workspace/common/requests';
import {
  UpdateSelectedPlanId,
  UpdateUserInformation,
} from '../actions/subscribe.actions';

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
  @Action(UpdateSelectedPlanId)
  updateSelectedPlanId(
    context: StateContext<SubscribeRequest>,
    action: UpdateSelectedPlanId
  ) {
    context.setState({ ...context.getState(), planId: action.planId });
  }

  @Action(UpdateUserInformation)
  updateUserInformation(
    context: StateContext<SubscribeRequest>,
    action: UpdateUserInformation
  ) {
    context.setState({
      ...context.getState(),
      email: action.information.email,
      firstname: action.information.firstname,
      lastname: action.information.lastname,
    });
  }
}
