import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';
import { MyProfileViewComponent } from './my-profile-view/my-profile-view.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [MyProfileComponent, MyProfileViewComponent],
  providers: [MyProfileModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyProfileComponent,
        children: [
          {
            path: '',
            component: MyProfileViewComponent,
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
export class MyProfileModule {}
