import { ConfigurationAction } from '../actions/configuration.actions';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ConfigurationService } from '../../services/configuration.service';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class ConfigurationEffects {
  retrieveStripePublishableKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationAction.retrieveStripePublishableKey),
      mergeMap(() =>
        this.configurationService.retrieveStripePublishableKey().pipe(
          map((stripePublishableKey) =>
            ConfigurationAction.retrieveStripePublishableKeySuccess({
              stripePublishableKey,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private configurationService: ConfigurationService
  ) {}
}
