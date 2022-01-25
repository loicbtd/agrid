import { StripeConfigurationModel } from "@workspace/common/models";

export class Refresh {
  static readonly type = '[Stripe Configuration] Refresh';
  constructor(public stripeConfiguration: StripeConfigurationModel) {}
}
