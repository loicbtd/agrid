import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SigninComponent } from './signin.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SigninComponent],
  providers: [SigninModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SigninComponent,
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
})
export class SigninModule {}
