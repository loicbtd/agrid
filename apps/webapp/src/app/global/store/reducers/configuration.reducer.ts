import { createReducer, on } from '@ngrx/store';
import { retrieveStripePublishableKeySuccess } from '../actions/configuration.actions';
import { ConfigurationState } from '../states/configuration.state';

const initialState: ConfigurationState = {};

export const configurationReducer = createReducer(
  initialState,
  on(retrieveStripePublishableKeySuccess, (state) => ({
    stripePublishableKey: state.stripePublishableKey,
  }))
);
