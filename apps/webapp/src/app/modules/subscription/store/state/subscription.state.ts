import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  UpdateLegalConditionsAcceptation,
  UpdatePaymentStatus,
  UpdateSelectedPlanId,
  UpdateUserInformation,
} from '../actions/subscription.actions';
import { SubscriptionModel } from '../../models/subscription.model';

@State<SubscriptionModel>({
  name: 'SubscriptionState',
  defaults: {
    email: '',
    firstname: '',
    lastname: '',
    planId: '',
    legalConditionsAccepted: false,
  },
})
@Injectable()
export class SubscriptionState {
  @Action(UpdateSelectedPlanId)
  updateSelectedPlanId(
    context: StateContext<SubscriptionModel>,
    action: UpdateSelectedPlanId
  ) {
    context.setState({ ...context.getState(), planId: action.planId });
  }

  @Action(UpdateUserInformation)
  updateUserInformation(
    context: StateContext<SubscriptionModel>,
    action: UpdateUserInformation
  ) {
    context.setState({
      ...context.getState(),
      email: action.information.email,
      firstname: action.information.firstname,
      lastname: action.information.lastname,
    });
  }

  @Action(UpdateLegalConditionsAcceptation)
  updateLegalConditionsAcceptation(
    context: StateContext<SubscriptionModel>,
    action: UpdateLegalConditionsAcceptation
  ) {
    context.setState({
      ...context.getState(),
      legalConditionsAccepted: action.accepted,
    });
  }

  @Action(UpdatePaymentStatus)
  updatePaymentStatus(
    context: StateContext<SubscriptionModel>,
    action: UpdatePaymentStatus
  ) {
    context.setState({
      ...context.getState(),
      paymentStatus: action.status,
    });
  }
}
