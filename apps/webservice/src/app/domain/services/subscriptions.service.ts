import { environment } from './../../../environments/environment';
import { Injectable } from '@nestjs/common';
import {
  PlanEntity,
  SubscriptionEntity,
  UserEntity,
} from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stripe } from 'stripe';
import { SubscribeRequest } from '@workspace/common/requests';
import { UnkownPlanError } from '../errors/unkown-plan.error';
import { UnabilityToChargePaymentMethodWithStripeError } from '../errors/unability-to-charge-payment-method-with-stripe.error';
import { PaymentMethodChargeIsNotAuthorizedByStripeError } from '../errors/payment-method-charge-is-not-authorized-by-stripe.error';
import { UnabilityToCreateUserError } from '../errors/unability-to-create-user.error';
import { UnabilityToCreateSubscriptionError } from '../errors/unability-to-create-subscription.error';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<SubscriptionEntity>,
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>
  ) {}

  async subscribe(
    subscriptionRequest: SubscribeRequest
  ): Promise<SubscriptionEntity> {
    let user: UserEntity = {
      email: subscriptionRequest.email,
      firstname: subscriptionRequest.firstname,
      lastname: subscriptionRequest.lastname,
    };

    let plan: PlanEntity;
    try {
      plan = await this.plansRepository.findOneOrFail(
        subscriptionRequest.planId
      );
    } catch (error) {
      throw new UnkownPlanError();
    }

    let charge: Stripe.Response<Stripe.Charge>;
    try {
      charge = await new Stripe(
        environment.stripeSecretKey,
        null
      ).charges.create({
        amount: plan.price,
        currency: 'EUR',
        source: subscriptionRequest.stripeCardToken,
        metadata: {
          email: subscriptionRequest.email,
          planId: subscriptionRequest.planId,
        },
      });
    } catch (error) {
      throw new UnabilityToChargePaymentMethodWithStripeError(error.message);
    }

    if (charge.outcome.type !== 'authorized') {
      throw new PaymentMethodChargeIsNotAuthorizedByStripeError();
    }

    try {
      user = await this.usersRepository.create(user);
    } catch (error) {
      throw new UnabilityToCreateUserError(error.message);
    }

    let subscription: SubscriptionEntity = {
      user: user,
      plan: plan,
      creationDate: new Date(),
    };

    try {
      subscription = await this.subscriptionsRepository.create(subscription);
    } catch (error) {
      throw new UnabilityToCreateSubscriptionError(error.message);
    }

    return subscription;
  }
}
