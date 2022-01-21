import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { AppRoute } from './global/constants/app-route.constant';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { StripeConfigurationState } from './global/store/state/stripe-configuration.state';

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
    NgxsModule.forRoot([StripeConfigurationState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
