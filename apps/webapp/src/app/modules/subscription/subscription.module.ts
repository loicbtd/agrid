import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionStepPlanSelectionComponent } from './components/subscription-step-plan-selection/subscription-step-plan-selection.component';
import { SubscriptionStepUserInformationComponent } from './components/subscription-step-user-information/subscription-step-user-information.component';
import { SubscriptionStepPaymentComponent } from './components/subscription-step-payment/subscription-step-payment.component';
import { NgxsModule } from '@ngxs/store';
import { SubscriptionState } from './store/state/subscription.state';
import { PlanMustBeSelectedGuard } from './guards/plan-must-be-selected.guard';
import { UserInformationMustBeCompletedGuard } from './guards/user-information-must-be-completed.guard';
import { SubscriptionStepSummaryComponent } from './components/subscription-step-summary/subscription-step-summary.component';
import { subscriptionRoutes } from './constants/subscription-routes.constant';
import { SubscriptionStepLegalConditionsAcceptationComponent } from './components/subscription-step-legal-conditions-acceptation/subscription-step-legal-conditions-acceptation.component';
import { LegalConditionsMustBeAcceptedGuard } from './guards/legal-conditions-must-be-accepted.guard';
import { PaymentMustHaveBeenTriggeredGuard } from './guards/payment-must-have-been-triggered.guard';
import { PaymentMustNotHaveAlreadyBeenTriggeredGuard } from './guards/payment-must-not-have-already-been-triggered.guard';

@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionStepPlanSelectionComponent,
    SubscriptionStepUserInformationComponent,
    SubscriptionStepPaymentComponent,
    SubscriptionStepSummaryComponent,
    SubscriptionStepLegalConditionsAcceptationComponent,
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
            path: subscriptionRoutes.planSelection,
            component: SubscriptionStepPlanSelectionComponent,
            canActivate: [PaymentMustNotHaveAlreadyBeenTriggeredGuard],
          },
          {
            path: subscriptionRoutes.legal,
            component: SubscriptionStepLegalConditionsAcceptationComponent,
            canActivate: [
              PlanMustBeSelectedGuard,
              PaymentMustNotHaveAlreadyBeenTriggeredGuard,
            ],
          },
          {
            path: subscriptionRoutes.userInformation,
            component: SubscriptionStepUserInformationComponent,
            canActivate: [
              PlanMustBeSelectedGuard,
              LegalConditionsMustBeAcceptedGuard,
              PaymentMustNotHaveAlreadyBeenTriggeredGuard,
            ],
          },
          {
            path: subscriptionRoutes.payment,
            component: SubscriptionStepPaymentComponent,
            canActivate: [
              PlanMustBeSelectedGuard,
              LegalConditionsMustBeAcceptedGuard,
              UserInformationMustBeCompletedGuard,
              PaymentMustNotHaveAlreadyBeenTriggeredGuard,
            ],
          },
          {
            path: subscriptionRoutes.summary,
            component: SubscriptionStepSummaryComponent,
            canActivate: [
              PlanMustBeSelectedGuard,
              LegalConditionsMustBeAcceptedGuard,
              UserInformationMustBeCompletedGuard,
              PaymentMustHaveBeenTriggeredGuard,
            ],
          },
          {
            path: '**',
            redirectTo: subscriptionRoutes.planSelection,
          },
        ],
      },
    ]),
    NgxsModule.forFeature([SubscriptionState]),
  ],
})
export class SubsriptionModule {}
