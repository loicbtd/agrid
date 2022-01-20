import { ConfigurationModel } from '@workspace/common/models';
import { environment } from './../environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { APP_INITIALIZER, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { AppRoute } from './global/constants/app-route.constant';
import { NgxsModule } from '@ngxs/store';
import { ConfigurationService } from './global/services/configuration.service';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

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
  ],
  bootstrap: [AppComponent],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configurationService: ConfigurationService) =>
        configurationService.get(),
      multi: true,
      deps: [ConfigurationService],
    },
  ],
})
export class AppModule {}
