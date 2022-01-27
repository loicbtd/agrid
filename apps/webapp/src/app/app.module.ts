import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { AppRoute } from './global/constants/app-route.constant';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { StripeConfigurationState } from './global/store/state/stripe-configuration.state';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorsHandler } from './global/handlers/errors.handler';
import { PlansState } from './global/store/state/plans.state';
import { MyProfileState } from './global/store/state/my-profile.state';
import { JwtState } from './global/store/state/jwt.state';
import { JwtInterceptor } from './global/interceptors/jwt.interceptor';
import { ToastMessageService } from './global/services/toast-message.service';

const states = [JwtState, MyProfileState, PlansState, StripeConfigurationState];

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(
    httpClient,
    'assets/global/translations/',
    '.json'
  );
}

export function createErrorsHandler(
  toastMessageService: ToastMessageService,
  translateService: TranslateService
) {
  return new ErrorsHandler(toastMessageService, translateService);
}

export function createJwtInterceptor(store: Store) {
  return new JwtInterceptor(store);
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
            import('./modules/signin/signin.module').then(
              (m) => m.SigninModule
            ),
        },
        {
          path: AppRoute.initialSetup,
          loadChildren: () =>
            import('./modules/initial-setup/initial-setup.module').then(
              (m) => m.InitialSetupModule
            ),
        },
        {
          path: AppRoute.administration,
          loadChildren: () =>
            import('./modules/administration/administration.module').then(
              (m) => m.AdministrationModule
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
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({ key: [JwtState] }),
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
      deps: [ToastMessageService, TranslateService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: createJwtInterceptor,
      deps: [Store],
      multi: true,
    },
  ],
})
export class AppModule {}
