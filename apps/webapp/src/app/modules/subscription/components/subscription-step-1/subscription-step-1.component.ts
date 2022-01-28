import { PlanEntity } from '@workspace/common/entities';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../../../global/services/plans.service';
import { Select, Store } from '@ngxs/store';
import { PlansState } from '../../../../global/store/state/plans.state';
import { lastValueFrom, Observable } from 'rxjs';
import { UpdateSelectedPlanId } from '../../store/actions/subscribe.actions';
import { SubscribeState } from '../../store/state/subscribe.state';
import { SubscribeRequest } from '@workspace/common/requests';
import { SubscriptionService } from '../../../../global/services/subscription.service';

@Component({
  templateUrl: './subscription-step-1.component.html',
  styleUrls: ['./subscription-step-1.component.scss'],
})
export class SubscriptionStep1Component implements OnInit {
  @Select(PlansState) plans$: Observable<PlanEntity[]>;

  @Select(SubscribeState) subscribeState$: Observable<SubscribeRequest>;

  responsiveOptions = [
    {
      breakpoint: '10000px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '900px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '760px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '500px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly plansService: PlansService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.plansService.refresh();
  }

  async selectPlan(plan: PlanEntity) {
    if (!plan.id) {
      return;
    }

    await lastValueFrom(this.store.dispatch(new UpdateSelectedPlanId(plan.id)));

    this.router.navigate(['..', 'step-2'], {
      relativeTo: this.activatedRoute,
    });
  }
}
