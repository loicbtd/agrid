import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SubscriptionEntity } from '@workspace/common/entities';
import { MyProfileModel } from '@workspace/common/models';
import { ProfileService } from '../../../global/services/profile.service';
import { ToastMessageService } from '../../../global/services/toast-message.service';
import { MyProfileState } from '../../../global/store/state/my-profile.state';
import { SubscriptionService } from '../../../global/services/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-view',
  templateUrl: './my-profile-view.component.html',
  styleUrls: ['./my-profile-view.component.scss'],
})
export class MyProfileViewComponent implements OnInit {
  currentProfile!: MyProfileModel;
  form = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
  });
  isEditing = false;
  isUploadingData = false;
  subscriptions!: SubscriptionEntity[];
  noSubscriptions = false;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly profileService: ProfileService,
    private toastMessageService: ToastMessageService,
    private readonly subscriptionService: SubscriptionService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initUser();
    if (!this.currentProfile) {
      this.toastMessageService.showInfo(
        'Merci de vous connecter pour accéder à cette page'
      );
      this.router.navigate(['/signin']);
    } else {
      this.subscriptionService
        .retrieveMySubscriptions()
        .subscribe((subscriptions: SubscriptionEntity[]) => {
          this.subscriptions = subscriptions;
          this.noSubscriptions = subscriptions.length !== 0;
        });
    }
  }

  async initUser() {
    await this.profileService.refresh();
    this.currentProfile =
      this.store.selectSnapshot<MyProfileModel>(MyProfileState);
  }

  enableEditing() {
    this.form.get('firstname')?.patchValue(this.currentProfile.firstname);
    this.form.get('lastname')?.patchValue(this.currentProfile.lastname);
    this.form.updateValueAndValidity();
    this.isEditing = true;
  }

  disabledEditing() {
    this.isEditing = false;
    this.form.reset();
  }

  validateChanges() {
    if (this.form.invalid) {
      return;
    }
    this.isUploadingData = true;
    this.profileService
      .updateMyProfile({
        firstname: this.form.get('firstname')?.value,
        lastname: this.form.get('lastname')?.value,
      })
      .subscribe(async () => {
        this.initUser();
        this.toastMessageService.showSuccess(
          'Vos informations ont été mises à jour 👌'
        );
        this.isUploadingData = false;
        this.disabledEditing();
      });
  }
}
