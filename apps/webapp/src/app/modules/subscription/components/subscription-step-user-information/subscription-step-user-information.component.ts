import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SubscribeRequest } from '@workspace/common/requests';
import { lastValueFrom } from 'rxjs';
import { subscriptionRoutes } from '../../constants/subscription-routes.constant';
import {
  UpdateSteps,
  UpdateUserInformation,
} from '../../store/actions/subscription.actions';
import { SubscriptionState } from '../../store/state/subscription.state';

@Component({
  template: `
    <div class="flex flex-column">
      <form [formGroup]="form" novalidate class="form-group grid formgrid">
        <div class="field col-12">
          <span class="p-float-label w-full">
            <input
              id="email"
              formControlName="email"
              type="email"
              pInputText
              class="w-full"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  form.controls.email.touched && form.controls.email.invalid
              }"
            />
            <label for="email">Courriel</label>
          </span>
          <div class="flex p-flex-column">
            <small
              class="p-error"
              *ngIf="
                form.controls.email.touched &&
                form.controls.email.errors?.required
              "
            >
              Le courriel est requis
            </small>
            <small
              class="p-error"
              *ngIf="
                form.controls.email.touched && form.controls.email.errors?.email
              "
            >
              Le courriel n'est pas valide
            </small>
          </div>
        </div>

        <div class="field col-12 md:col-6">
          <span class="p-float-label w-full mt-3">
            <input
              id="lastname"
              formControlName="lastname"
              type="text"
              pInputText
              class="w-full"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  form.controls.lastname.touched &&
                  form.controls.lastname.invalid
              }"
            />
            <label for="lastname">Nom</label>
          </span>
          <div class="flex flex-column">
            <small
              class="p-error"
              *ngIf="
                form.controls.lastname.touched &&
                form.controls.lastname.errors?.required
              "
            >
              Le nom est requis
            </small>
          </div>
        </div>

        <div class="field col-12 md:col-6">
          <span class="p-float-label w-full mt-3">
            <input
              id="firstname"
              formControlName="firstname"
              type="text"
              pInputText
              class="w-full"
              [ngClass]="{
                'ng-invalid ng-dirty':
                  form.controls.firstname.touched &&
                  form.controls.firstname.invalid
              }"
            />
            <label for="firstname">Prénom</label>
          </span>
          <div class="flex flex-column">
            <small
              class="p-error"
              *ngIf="
                form.controls.firstname.touched &&
                form.controls.firstname.errors?.required
              "
            >
              Le prénom est requis
            </small>
          </div>
        </div>

        <div class="field col-12 flex mt-3">
          <p-button
            pRipple
            label="Suivant"
            class="w-full"
            styleClass="w-full m-auto"
            [disabled]="form.invalid"
            (click)="saveInformation()"
          ></p-button>
        </div>
      </form>
    </div>
  `,
})
export class SubscriptionStepUserInformationComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const subscribeState =
      this.store.selectSnapshot<SubscribeRequest>(SubscriptionState);
    this.form.controls.email.setValue(subscribeState.email);
    this.form.controls.lastname.setValue(subscribeState.lastname);
    this.form.controls.firstname.setValue(subscribeState.firstname);

    await lastValueFrom(
      this.store.dispatch(
        new UpdateSteps(
          subscriptionRoutes.legal,
          subscriptionRoutes.payment
        )
      )
    );
  }

  async saveInformation() {
    if (this.form.invalid) {
      return;
    }

    await lastValueFrom(
      this.store.dispatch(
        new UpdateUserInformation({
          email: this.form.get('email')?.value,
          firstname: this.form.get('firstname')?.value,
          lastname: this.form.get('lastname')?.value,
        })
      )
    );

    this.router.navigate(['..', subscriptionRoutes.payment], {
      relativeTo: this.activatedRoute,
    });
  }
}
