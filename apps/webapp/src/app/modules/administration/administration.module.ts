import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [AdministrationComponent, DashboardComponent],
  providers: [AdministrationModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdministrationComponent,
        children: [
          {
            path: '',
            component: DashboardComponent,
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
    ]),
  ],
})
export class AdministrationModule {}
