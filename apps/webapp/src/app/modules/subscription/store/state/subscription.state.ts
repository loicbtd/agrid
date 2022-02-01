import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  Reset,
  ResetPayment,
  UpdateLegalConditionsAcceptation,
  UpdatePaymentStatus,
  UpdateSelectedPlanId,
  UpdateSteps,
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
    paymentStatus: undefined,
    paymentTriggered: false,
    previousStep: undefined,
    nextStep: undefined,
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
      paymentTriggered: true,
    });
  }

  @Action(Reset)
  reset(context: StateContext<SubscriptionModel>) {
    context.setState({
      email: '',
      firstname: '',
      lastname: '',
      planId: '',
      legalConditionsAccepted: false,
      paymentStatus: undefined,
      paymentTriggered: false,
      previousStep: undefined,
      nextStep: undefined,
    });
  }

  @Action(ResetPayment)
  resetPayment(context: StateContext<SubscriptionModel>) {
    context.setState({
      ...context.getState(),
      paymentStatus: undefined,
      paymentTriggered: false,
    });
  }

  @Action(UpdateSteps)
  updateSteps(context: StateContext<SubscriptionModel>, action: UpdateSteps) {
    context.setState({
      ...context.getState(),
      previousStep: action.previousStep,
      nextStep: action.nextStep,
    });
  }
}
