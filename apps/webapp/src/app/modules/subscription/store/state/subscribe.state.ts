import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SubscribeRequest } from '@workspace/common/requests';
import {
  UpdatePaymentIntentId,
  UpdateSelectedPlanId,
  UpdateUserInformation,
} from '../actions/subscribe.actions';

@State<SubscribeRequest>({
  name: SubscribeState.name,
  defaults: {
    email: 'test@test.fr',
    firstname: 'test',
    lastname: 'test',
    planId: '84325ed4-d1db-4472-8d94-cac8ca844978',
    paymentIntendId: '',
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

  @Action(UpdatePaymentIntentId)
  updatePaymentIntentId(
    context: StateContext<SubscribeRequest>,
    action: UpdatePaymentIntentId
  ) {
    context.setState({
      ...context.getState(),
      paymentIntendId: action.paymentIntendId,
    });
  }
}
