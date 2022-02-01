import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { errorsRoutes } from './constants/errors-routes.constant';
import { ErrorPagesComponent } from './errors.component';

@NgModule({
  declarations: [ErrorPagesComponent, AccessDeniedComponent, NotFoundComponent],
  providers: [ErrorsModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorPagesComponent,
        children: [
          {
            path: errorsRoutes.accessDenied,
            component: AccessDeniedComponent,
          },
          {
            path: errorsRoutes.notFound,
            component: NotFoundComponent,
          },
          {
            path: '**',
            redirectTo: errorsRoutes.notFound,
          },
        ],
      },
    ]),
  ],
})
export class ErrorsModule {}
