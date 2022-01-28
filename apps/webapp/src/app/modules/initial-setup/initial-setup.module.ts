import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { InitialSetupComponent } from './initial-setup.component';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { IsInitialSetupPermittedState } from './is-initial-setup-permitted.state';

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
    NgxsModule.forFeature([IsInitialSetupPermittedState]),
  ],
})
export class InitialSetupModule {}
