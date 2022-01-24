import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SigninPageComponent } from './components/signin-page/signin-page.component';

@NgModule({
  declarations: [LoginComponent,SigninPageComponent],
  providers: [LoginModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        children: [
          {
            path: '',
            component: SigninPageComponent,
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
export class LoginModule {}
