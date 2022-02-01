export class SubscriptionModel {
  email?: string;

  firstname?: string;

  lastname?: string;

  planId?: string;

  legalConditionsAccepted?: boolean;

  paymentStatus?: unknown;

  paymentTriggered?: boolean;

  previousStep?: string;

  nextStep?: string;
}
