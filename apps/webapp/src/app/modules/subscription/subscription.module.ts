import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { Step1Component } from './components/step-1-personal/step-1.component';


@NgModule({
  declarations: [SubscriptionComponent, Step1Component],
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
            component: Step1Component,
          },
          {
            path: '**',
            redirectTo: 'step-1',
          },
        ],
      },
    ]),
  ],
})
export class SubsriptionModule {}
