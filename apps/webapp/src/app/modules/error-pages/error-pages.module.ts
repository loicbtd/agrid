import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { ErrorPagesComponent } from './error-pages.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [ErrorPagesComponent, AccessDeniedComponent, NotFoundComponent],
  providers: [ErrorPagesModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorPagesComponent,
        children: [
          {
            path: 'access-denied',
            component: NotFoundComponent,
          },
          {
            path: 'not-found',
            component: NotFoundComponent,
          },
          {
            path: '**',
            redirectTo: 'not-found',
          },
        ],
      },
    ]),
  ],
})
export class ErrorPagesModule {}
