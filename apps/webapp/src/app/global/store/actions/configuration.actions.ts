import { createAction, props } from '@ngrx/store';


export const retrieveStripePublishableKey = createAction(
  '[Configuration] Retrieve Stripe Publishable Key'
);

export const retrieveStripePublishableKeySuccess = createAction(
  '[Configuration] Retrieve Stripe Publishable Key Success',
  props<{ stripePublishableKey: string }>()
);