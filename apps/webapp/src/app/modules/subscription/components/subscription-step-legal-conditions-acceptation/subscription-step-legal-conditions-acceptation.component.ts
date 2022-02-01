import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { lastValueFrom, Observable } from 'rxjs';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';
import { SubscriptionModel } from '../../models/subscription.model';
import { UpdateLegalConditionsAcceptation, UpdateSteps } from '../../store/actions/subscription.actions';
import { SubscriptionState } from '../../store/state/subscription.state';

@Component({
  template: `
    <div class="field-checkbox">
      <p-checkbox
        [(ngModel)]="checked"
        [binary]="true"
        (onChange)="handleCheckboxChange(checked)"
        inputId="accepted"
      ></p-checkbox>
      <label for="accepted"
        >En cochant cette case, j'atteste avoir lu les
        <a
          [routerLink]="['/legal']"
          target="_blank"
          class="no-underline font-bold text-700"
          >conditions générales d'utilisation et les conditions générales de
          vente</a
        >
        et je les accepte. De plus, je consens à la collecte de mes données
        personnelles tel que cela est décrit dans nos conditions d'utilisation.
      </label>
    </div>

    <p-button
      styleClass="w-full mt-4"
      (click)="goToNextStep()"
      label="Suivant"
      [disabled]="!(subscription$ | async)?.legalConditionsAccepted"
    ></p-button>
  `,
})
export class SubscriptionStepLegalConditionsAcceptationComponent
  implements OnInit
{
  @Select(SubscriptionState) subscription$: Observable<SubscriptionModel>;

  checked = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}
  async ngOnInit() {
    this.checked =
      !!this.store.selectSnapshot<SubscriptionModel>(SubscriptionState)
        ?.legalConditionsAccepted;

    await lastValueFrom(
      this.store.dispatch(
        new UpdateSteps(
          subscriptionRoutes.planSelection,
          subscriptionRoutes.userInformation
        )
      )
    );
  }

  handleCheckboxChange(checked: boolean) {
    this.store.dispatch(new UpdateLegalConditionsAcceptation(checked));
  }

  goToNextStep() {
    this.router.navigate(['..', subscriptionRoutes.userInformation], {
      relativeTo: this.activatedRoute,
    });
  }
}
