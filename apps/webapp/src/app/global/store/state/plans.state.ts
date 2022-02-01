import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PlanEntity } from '@workspace/common/entities';
import { Refresh } from '../actions/plans.actions';

@State<PlanEntity[] | null>({
  name: 'PlanState',
  defaults: null,
})
@Injectable()
export class PlansState {
  @Action(Refresh)
  refresh(context: StateContext<PlanEntity[]>, action: Refresh) {
    context.setState(action.plans);
  }
}
