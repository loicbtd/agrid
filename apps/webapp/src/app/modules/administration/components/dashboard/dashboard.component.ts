import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { PlanEntity } from '@workspace/common/entities';
import { UserProfileModel } from '@workspace/common/models';
import { DateStatisticsResponseDto } from '@workspace/common/responses';
import { PlansService } from '../../../../global/services/plans.service';
import { PlansState } from '../../../../global/store/state/plans.state';
import { ProfileService } from '../../../../global/services/profile.service';
import { ToastMessageService } from '../../../../global/services/toast-message.service';
import { StatisticsService } from '../../services/statistics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignoutService } from 'apps/webapp/src/app/global/services/signout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  @ViewChild('menuItems') menu: any;
  userChart = {};
  subscriptionChart = {};
  salesChart = {};
  countUserOnCurrentMonth!: DateStatisticsResponseDto;
  colorCss = '#4bc714';
  steps = [
    {
      label: 'Année',
      value: 'YEAR',
      icon: 'pi pi-fw pi-calendar',
    },
    {
      label: 'Mois',
      value: 'MONTH',
      icon: 'pi pi-fw pi-calendar',
    },
    {
      label: 'Jour',
      value: 'DAY',
      icon: 'pi pi-fw pi-calendar',
    },
  ];
  activeStep = this.steps[0];

  users!: UserProfileModel[];
  clonedUsers: { [s: string]: UserProfileModel } = {};
  pageLoaded = 0;

  planDialog: boolean;
  plans: PlanEntity[];
  clonedPlans: { [s: string]: PlanEntity } = {};
  selectedPlans: PlanEntity[];
  submitted: boolean;
  newPlan!: PlanEntity;
  form!: FormGroup;

  constructor(
    private readonly _statisticsController: StatisticsService,
    private readonly _profileService: ProfileService,
    private readonly _toastMessage: ToastMessageService,
    private readonly plansService: PlansService,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly signoutService: SignoutService
  ) {}

  ngOnInit(): void {
    this.changeTabView({ index: 0 });
  }

  async changeTabView(event: { index: number }) {
    switch (event.index) {
      case 0:
        this.updateCharts();
        break;
      case 1:
        this.getAllUsers();
        break;
      case 2:
        this.updatePlans();
        break;
    }
  }

  async updatePlans() {
    await this.plansService.refresh();
    this.plans = this.store
      .selectSnapshot<PlanEntity[]>(PlansState)
      .map((obj) => ({ ...obj }));
  }

  updateCharts() {
    this.updateUserChart();
    this.updateSubscriptionChart();
    this.updateCountCurrentMonth();
    this.updateSalesChart();
  }

  updateUserChart() {
    this._statisticsController
      .retrieveUsersCountOverTime(this.activeStep.value)
      .subscribe((res: DateStatisticsResponseDto[]) => {
        const labels = [];
        const data = [];
        for (let index = 0; index < res.length; index++) {
          const stat = res[index];
          labels.push(stat.date);
          data.push(stat.number);
        }
        this.userChart = {
          labels: labels,
          datasets: [
            {
              label: "Nombre d'utilisateurs",
              backgroundColor: this.colorCss,
              borderColor: this.colorCss,
              data: data,
            },
          ],
        };
        this.pageLoaded++;
      });
  }

  updateSubscriptionChart() {
    this._statisticsController
      .retrieveSubscriptionCountOverTime(this.activeStep.value)
      .subscribe((res: DateStatisticsResponseDto[]) => {
        const labels = [];
        const data = [];
        for (let index = 0; index < res.length; index++) {
          const stat = res[index];
          labels.push(stat.date);
          data.push(stat.number);
        }
        this.subscriptionChart = {
          labels: labels,
          datasets: [
            {
              label: 'Nombre de souscriptions',
              backgroundColor: this.colorCss,
              borderColor: this.colorCss,
              data: data,
            },
          ],
        };
        this.pageLoaded++;
      });
  }

  activateMenu() {
    this.activeStep = this.menu.activeItem;
    this.updateCharts();
  }

  updateCountCurrentMonth() {
    this._statisticsController
      .retrieveUserCountOnCurrentMonth()
      .subscribe((res: DateStatisticsResponseDto[]) => {
        this.countUserOnCurrentMonth = res[0];
        this.pageLoaded++;
      });
  }

  updateSalesChart() {
    this._statisticsController
      .retrieveSalesCountOverTime(this.activeStep.value)
      .subscribe((res: DateStatisticsResponseDto[]) => {
        const labels = [];
        const data = [];
        for (let index = 0; index < res.length; index++) {
          const stat = res[index];
          labels.push(stat.date);
          data.push(stat.number);
        }
        this.salesChart = {
          labels: labels,
          datasets: [
            {
              label: "Chiffre d'affaires",
              backgroundColor: this.colorCss,
              borderColor: this.colorCss,
              data: data,
            },
          ],
        };
        this.pageLoaded++;
      });
  }

  getAllUsers() {
    this._profileService
      .retrieveAllProfiles()
      .subscribe((users: UserProfileModel[]) => {
        this.users = users;
      });
  }

  onRowEditInitUser(user: UserProfileModel) {
    this.clonedUsers[user.id] = { ...user };
  }

  onRowEditSaveUser(user: UserProfileModel) {
    delete this.clonedUsers[user.id];
    this._profileService
      .updateProfile(user.id, {
        firstname: user.firstname,
        lastname: user.lastname,
      })
      .subscribe((profile: UserProfileModel) => {
        this.users[this.users.indexOf(user)] = profile;
        this._toastMessage.showSuccess('Profil mit à jour');
      });
  }

  onRowEditCancelUser(user: UserProfileModel, index: number) {
    this.users[index] = this.clonedUsers[user.id];
    delete this.clonedUsers[user.id];
  }

  openNew() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      stripeProductId: ['', [Validators.required]],
      stripeProductPriceId: ['', [Validators.required]],
    });
    this.newPlan = {};
    this.submitted = false;
    this.planDialog = true;
  }

  async deleteSelectedProducts() {
    let plan: PlanEntity;
    for (let i = 0; i < this.selectedPlans.length; i++) {
      plan = this.selectedPlans[i];
      plan?.id && (await this.plansService.delete(plan?.id).subscribe());
    }
    this.newPlan = {};
    const plural = this.selectedPlans.length > 1 ? 's' : '';
    this.selectedPlans = [];
    this._toastMessage.showSuccess('Plan' + plural + ' supprimé' + plural);
    await this.updatePlans();
  }

  onRowEditInitPlan(plan: PlanEntity) {
    plan.id && (this.clonedPlans[plan.id] = { ...plan });
  }

  onRowEditSavePlan(plan: PlanEntity) {
    if (
      plan.id &&
      plan.name &&
      plan.price &&
      plan.stripeProductId &&
      plan.stripeProductPriceId
    ) {
      delete this.clonedPlans[plan.id];
      this.plansService
        .update(plan.id, {
          name: plan.name,
          price: plan.price,
          stripeProductId: plan.stripeProductId,
          stripeProductPriceId: plan.stripeProductPriceId,
        })
        .subscribe(async () => {
          await this.updatePlans();
          this._toastMessage.showSuccess('Plan mit à jour');
        });
    }
  }

  onRowEditCancelPlan(plan: PlanEntity, index: number) {
    if (plan.id) {
      this.plans[index] = this.clonedPlans[plan.id];
      delete this.clonedPlans[plan.id];
    }
  }

  hideNewDialog() {
    this.planDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    if (this.form.invalid) {
      return;
    }
    this.plansService
      .create({
        name: this.form.get('name')?.value,
        price: this.form.get('price')?.value,
        stripeProductId: this.form.get('stripeProductId')?.value,
        stripeProductPriceId: this.form.get('stripeProductPriceId')?.value,
      })
      .subscribe(async () => {
        await this.updatePlans();
        this.hideNewDialog();
        this._toastMessage.showSuccess('Le plan a été ajouté');
      });
  }

  async signout() {
    this.signoutService.signout();
  }
}
