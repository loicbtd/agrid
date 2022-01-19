import { PlanEntity } from '@workspace/common/entities';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subscription-step-1',
  templateUrl: './subscription-step-1.component.html',
  styleUrls: ['./subscription-step-1.component.scss'],
})
export class SubscriptionStep1Component implements OnInit {
  availablePlans: PlanEntity[] = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  get selectedPlan() {
    return this.subscriptionService.selectedPlan;
  }

  async ngOnInit() {
    this.availablePlans = await this.subscriptionService.getAvailablePlans();
  }

  select(plan: PlanEntity) {
    this.subscriptionService.selectedPlan = plan;
    this.router.navigate(['..', 'step-2'], {
      relativeTo: this.activatedRoute,
    });
  }
}
