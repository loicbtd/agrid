import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ShowcaseComponent } from './showcase.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [ShowcaseComponent,LandingPageComponent],
  providers: [ShowcaseModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShowcaseComponent,
        children: [
          {
            path: '',
            component: LandingPageComponent,
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
export class ShowcaseModule {}
