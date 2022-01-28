import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { LegalComponent } from './legal.component';
import { LegalPageComponent } from './components/legal-page/legal-page.component';


@NgModule({
  declarations: [LegalComponent,LegalPageComponent],
  providers: [LegalModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LegalComponent,
        children: [
          {
            path: '',
            component: LegalPageComponent,
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
export class LegalModule {}
