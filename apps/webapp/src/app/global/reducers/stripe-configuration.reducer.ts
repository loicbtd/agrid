import { StripeConfigurationAdapter } from '../adapters/stripe-configuration.adapter';
import { StripeConfigurationState } from '../states/stripe-configuration.state';
import * as fromAdapter from '../adapters/stripe-configuration.adapter';

export const initialState: StripeConfigurationState =
  StripeConfigurationAdapter.getInitialState({
    //Initialize other entity state properties
  });

export const getArticleState =
  createFeatureSelector<StripeConfigurationState>('stripeConfigurationState');
