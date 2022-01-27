import { Component, OnInit, ViewChild } from '@angular/core';
import { DateStatisticsResponseDto } from '@workspace/common/responses';
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

  constructor(private _statisticsController: StatisticsService) {}

  ngOnInit(): void {
    this.updateCharts();
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
      });
  }
}
