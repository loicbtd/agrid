import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorsRoute } from './constants/errors-route.constant';
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
            path: ErrorsRoute.accessDenied,
            component: AccessDeniedComponent,
          },
          {
            path: ErrorsRoute.notFound,
            component: NotFoundComponent,
          },
          {
            path: '**',
            redirectTo: ErrorsRoute.notFound,
          },
        ],
      },
    ]),
  ],
})
export class ErrorsModule {}
