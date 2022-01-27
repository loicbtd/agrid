import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SubscribeRequest } from '@workspace/common/requests';
import { lastValueFrom } from 'rxjs';
import { UpdateUserInformation } from '../../store/actions/subscribe.actions';
import { SubscribeState } from '../../store/state/subscribe.state';

@Component({
  templateUrl: './subscription-step-2.component.html',
  styleUrls: ['./subscription-step-2.component.scss'],
})
export class SubscriptionStep2Component implements OnInit {
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

  ngOnInit(): void {
    const subscribeState =
      this.store.selectSnapshot<SubscribeRequest>(SubscribeState);
    this.form.controls.email.setValue(subscribeState.email);
    this.form.controls.lastname.setValue(subscribeState.lastname);
    this.form.controls.firstname.setValue(subscribeState.firstname);
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

    this.router.navigate(['..', 'step-3'], {
      relativeTo: this.activatedRoute,
    });
  }
}
