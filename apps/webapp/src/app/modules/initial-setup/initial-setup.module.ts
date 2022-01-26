import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { InitialSetupComponent } from './initial-setup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InitialSetupComponent],
  providers: [InitialSetupModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: InitialSetupComponent,
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
})
export class InitialSetupModule {}
