import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';

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
            path: 'faq',
            component: FaqComponent,
          },
          {
            path: 'contact',
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
