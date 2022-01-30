import { Stripe, StripeElements } from '@stripe/stripe-js';

export class UpdateSelectedPlanId {
  static readonly type = '[Subscription] Update Selected Plan Id';
  constructor(public planId: string) {}
}

export class UpdateUserInformation {
  static readonly type = '[Subscription] Update User Information';
  constructor(
    public information: {
      firstname?: string;
      lastname?: string;
      email?: string;
    }
  ) {}
}

export class UpdateLegalConditionsAcceptation {
  static readonly type = '[Subscription] Update Legal Conditions Acceptation';
  constructor(public accepted: boolean) {}
}

export class UpdatePaymentStatus {
  static readonly type = '[Subscription] Update Payment Status';
  constructor(public status?: unknown) {}
}
