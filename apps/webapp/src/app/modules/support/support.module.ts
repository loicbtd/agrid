import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [SupportComponent, HomeComponent],
  providers: [SupportModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SupportComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
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
export class SupportModule {}
