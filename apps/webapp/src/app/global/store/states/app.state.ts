import { ConfigurationState } from './configuration.state';
import { RouterReducerState } from '@ngrx/router-store';

export class AppState {
  public static readonly initialState: AppState = {
    configurationState: ConfigurationState.initialState,
  };

  routerReducerState?: RouterReducerState;
  configurationState: ConfigurationState;
}
