import { environment } from './../environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { AppRoute } from './global/constants/app-route.constant';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: AppRoute.showcase,
          loadChildren: () =>
            import('./modules/showcase/showcase.module').then(
              (m) => m.ShowcaseModule
            ),
        },
        {
          path: AppRoute.support,
          loadChildren: () =>
            import('./modules/support/support.module').then(
              (m) => m.SupportModule
            ),
        },
        {
          path: AppRoute.subscription,
          loadChildren: () =>
            import('./modules/subscription/subscription.module').then(
              (m) => m.SubsriptionModule
            ),
        },
        {
          path: '**',
          redirectTo: AppRoute.showcase,
        },
      ],
      { initialNavigation: 'enabledBlocking', useHash: true }
    ),
    SharedModule,
    NgxStripeModule.forRoot(
      'pk_test_51K45joGyNnbBl4uQMzFx0YsDQefzYcLFIwEuTVOoJXW08zetFvE0p1EQ7LnUsFuPHfTNtod5eXWU3xSGUlsnWQ3G00N4eWb5nW'
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
