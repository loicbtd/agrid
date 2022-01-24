import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionStep1Component } from './components/subscription-step-1/subscription-step-1.component';
import { SubscriptionStep2Component } from './components/subscription-step-2/subscription-step-2.component';
import { SubscriptionStep3Component } from './components/subscription-step-3/subscription-step-3.component';
import { SubscriptionStep4Component } from './components/subscription-step-4/subscription-step-4.component';
import { NgxsModule } from '@ngxs/store';
import { SubscribeState } from './store/state/subscribe.state';

@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionStep1Component,
    SubscriptionStep2Component,
    SubscriptionStep3Component,
    SubscriptionStep4Component,
  ],
  providers: [SubsriptionModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubscriptionComponent,
        children: [
          {
            path: 'step-1',
            component: SubscriptionStep1Component,
          },
          {
            path: 'step-2',
            component: SubscriptionStep2Component,
          },
          {
            path: 'step-3',
            component: SubscriptionStep3Component,
          },
          {
            path: 'step-4',
            component: SubscriptionStep4Component,
          },
          {
            path: '**',
            redirectTo: 'step-1',
          },
        ],
      },
    ]),
    NgxsModule.forFeature([SubscribeState]),
  ],
  exports: [],
})
export class SubsriptionModule {}
