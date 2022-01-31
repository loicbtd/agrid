import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { supportRoutes } from './constants/support-routes.constant';

@NgModule({
  declarations: [
    SupportComponent,
    HomeComponent,
    FaqComponent,
    ContactComponent,
  ],
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
            path: supportRoutes.faq,
            component: FaqComponent,
          },
          {
            path: supportRoutes.contact,
            component: ContactComponent,
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
