import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { appRoutes } from './global/constants/app-route.constant';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
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
import { VisitedRoutesHistoryService } from './global/services/visited-routes-history.service';
import { VisitedRoutesHistoryState } from './global/store/state/visited-routes-history.state';

const states = [
  JwtState,
  MyProfileState,
  PlansState,
  StripeConfigurationState,
  VisitedRoutesHistoryState,
];

const persistedStates = [JwtState, MyProfileState];

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
          path: appRoutes.showcase,
          loadChildren: () =>
            import('./modules/showcase/showcase.module').then(
              (m) => m.ShowcaseModule
            ),
        },
        {
          path: appRoutes.legal,
          loadChildren: () =>
            import('./modules/legal/legal.module').then((m) => m.LegalModule),
        },
        {
          path: appRoutes.support,
          loadChildren: () =>
            import('./modules/support/support.module').then(
              (m) => m.SupportModule
            ),
        },
        {
          path: appRoutes.subscription,
          loadChildren: () =>
            import('./modules/subscription/subscription.module').then(
              (m) => m.SubsriptionModule
            ),
        },
        {
          path: appRoutes.signin,
          loadChildren: () =>
            import('./modules/signin/signin.module').then(
              (m) => m.SigninModule
            ),
        },
        {
          path: appRoutes.initialSetup,
          loadChildren: () =>
            import('./modules/initial-setup/initial-setup.module').then(
              (m) => m.InitialSetupModule
            ),
        },
        {
          path: appRoutes.administration,
          loadChildren: () =>
            import('./modules/administration/administration.module').then(
              (m) => m.AdministrationModule
            ),
        },
        {
          path: appRoutes.myProfile,
          loadChildren: () =>
            import('./modules/my-profile/my-profile.module').then(
              (m) => m.MyProfileModule
            ),
        },
        {
          path: appRoutes.errors,
          loadChildren: () =>
            import('./modules/errors/errors.module').then(
              (m) => m.ErrorsModule
            ),
        },
        {
          path: '**',
          redirectTo: appRoutes.showcase,
        },
      ],
      { initialNavigation: 'enabledBlocking', useHash: true }
    ),
    SharedModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({ key: persistedStates }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsRouterPluginModule.forRoot(),
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
      provide: APP_INITIALIZER,
      useFactory: () => () => null,
      deps: [VisitedRoutesHistoryService],
      multi: true,
    },
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
