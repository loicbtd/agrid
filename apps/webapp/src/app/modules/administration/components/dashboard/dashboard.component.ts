import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileModel } from '@workspace/common/models';
import { DateStatisticsResponseDto } from '@workspace/common/responses';
import { ProfileService } from '../../../../global/services/profile.service';
import { ToastMessageService } from '../../../../global/services/toast-message.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
  userSelected!: UserProfileModel;
  clonedProducts: { [s: string]: UserProfileModel } = {};
  pageLoaded = 0;

  constructor(
    private readonly _statisticsController: StatisticsService,
    private readonly _profileService: ProfileService,
    private readonly _toastMessage: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.updateCharts();
    this.getAllUsers();
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

  onRowEditInit(user: UserProfileModel) {
    this.userSelected = user;
    this.clonedProducts[user.id] = { ...user };
  }

  onRowEditSave(user: UserProfileModel) {
    delete this.clonedProducts[user.id];
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

  onRowEditCancel(user: UserProfileModel, index: number) {
    this.users[index] = this.clonedProducts[user.id];
    delete this.clonedProducts[user.id];
  }
}
