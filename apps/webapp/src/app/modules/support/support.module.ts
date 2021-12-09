import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [SupportComponent, HomeComponent, FaqComponent],
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
            path: 'faq',
            component: FaqComponent,
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
