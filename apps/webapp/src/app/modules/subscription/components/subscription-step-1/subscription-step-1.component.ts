import { PlanEntity } from '@workspace/common/entities';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../../../global/services/plans.service';
import { Select } from '@ngxs/store';
import { PlansState } from '../../../../global/store/state/plans.state';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './subscription-step-1.component.html',
  styleUrls: ['./subscription-step-1.component.scss'],
})
export class SubscriptionStep1Component implements OnInit {
  @Select(PlansState) plans$: Observable<PlanEntity[]>;

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
    private readonly activatedRoute: ActivatedRoute
  ) {}

  get selectedPlan() {
    return this.subscriptionService.selectedPlan;
  }

  async ngOnInit() {
    await this.plansService.refresh();
  }

  select(plan: PlanEntity) {
    this.subscriptionService.selectedPlan = plan;
    this.router.navigate(['..', 'step-2'], {
      relativeTo: this.activatedRoute,
    });
  }
}
