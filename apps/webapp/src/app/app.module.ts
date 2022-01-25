import { ErrorHandler, Injector, NgModule } from '@angular/core';
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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorsHandler } from './global/handlers/errors.handler';
import { PlansState } from './global/store/state/plans.state';

const states = [StripeConfigurationState, PlansState];

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(
    httpClient,
    'assets/global/translations/',
    '.json'
  );
}

export function createErrorsHandler(injector: Injector) {
  return new ErrorsHandler(injector);
}

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
          path: AppRoute.signin,
          loadChildren: () =>
            import('./modules/login/login.module').then((m) => m.LoginModule),
        },
        {
          path: '**',
          redirectTo: AppRoute.showcase,
        },
      ],
      { initialNavigation: 'enabledBlocking', useHash: true }
    ),
    SharedModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: createErrorsHandler,
      deps: [Injector],
    },
  ],
})
export class AppModule {}
