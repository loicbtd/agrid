export class UpdateSelectedPlanId {
  static readonly type = '[Subscribe] Update Selected Plan Id';
  constructor(public planId: string) {}
}

export class UpdateUserInformation {
  static readonly type = '[Subscribe] Update User Information';
  constructor(
    public information: {
      firstname?: string;
      lastname?: string;
      email?: string;
    }
  ) {}
}

export class UpdatePaymentIntentId {
  static readonly type = '[Subscribe] Update Payment Intent Id';
  constructor(public paymentIntendId: string) {}
}
