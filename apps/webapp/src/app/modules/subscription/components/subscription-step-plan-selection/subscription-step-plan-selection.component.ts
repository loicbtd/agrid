import { PlanEntity } from '@workspace/common/entities';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../../../global/services/plans.service';
import { Select, Store } from '@ngxs/store';
import { PlansState } from '../../../../global/store/state/plans.state';
import { lastValueFrom, Observable } from 'rxjs';
import {
  UpdateSelectedPlanId,
  UpdateSteps,
} from '../../store/actions/subscription.actions';
import { SubscriptionState } from '../../store/state/subscription.state';
import { SubscribeRequest } from '@workspace/common/requests';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';

@Component({
  template: `
    <ng-container *ngIf="plans$ | async as plans; else loading">
      <p-carousel
        [value]="plans"
        [circular]="true"
        [responsiveOptions]="responsiveOptions"
        styleClass="mt-2"
      >
        <ng-template let-plan pTemplate="item">
          <div class="plan-item select-none" (click)="selectPlan(plan)">
            <div
              class="plan-item-content flex flex-column"
              [class]="{
                active: plan?.id === (subscribeState$ | async)?.planId
              }"
            >
              <div class="m-auto">
                <div class="font-semibold">{{ plan.name }}</div>
                <small>{{ plan.price / 100 }} € par mois</small>
              </div>
            </div>
          </div>
        </ng-template>
      </p-carousel>
      <div class="flex flex-row">
        <a
          [routerLink]="['/showcase']"
          fragment="pricing-section"
          class="m-auto text-green-600 no-underline"
          >En savoir plus</a
        >
      </div>
    </ng-container>

    <ng-template #loading>
      <div class="flex w-100">
        <workspace-progress-spinner class="w-100 m-auto">
        </workspace-progress-spinner>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .plan-item {
        cursor: pointer;

        .plan-item-content {
          border: 1px solid var(--surface-d);
          border-radius: 3px;
          margin: 0.3rem;
          text-align: center;
          padding: 2rem 0;

          &:hover,
          &.active {
            background-color: #4caf50;
            color: white;
          }
        }

        .plan-image {
          width: 50%;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
      }
    `,
  ],
})
export class SubscriptionStepPlanSelectionComponent implements OnInit {
  @Select(PlansState) plans$: Observable<PlanEntity[]>;

  @Select(SubscriptionState) subscribeState$: Observable<SubscribeRequest>;

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
    private readonly plansService: PlansService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}

  async ngOnInit() {
    this.plansService.refresh();

    await lastValueFrom(
      this.store.dispatch(
        new UpdateSteps(undefined, subscriptionRoutes.legal)
      )
    );
  }

  async selectPlan(plan: PlanEntity) {
    if (!plan.id) {
      return;
    }

    await lastValueFrom(this.store.dispatch(new UpdateSelectedPlanId(plan.id)));

    this.router.navigate(['..', subscriptionRoutes.legal], {
      relativeTo: this.activatedRoute,
    });
  }
}
