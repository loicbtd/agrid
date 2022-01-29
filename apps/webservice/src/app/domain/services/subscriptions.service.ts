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
import { DateFormatPostgreSQL } from '../enumerations/date-format-postgresql.enumeration';
import { DateStatisticsResponseDto } from '@workspace/common/responses';

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
        source: subscriptionRequest.paymentIntendId,
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

  async retrieveCount(filter: string): Promise<DateStatisticsResponseDto[]> {
    let format: string;
    switch (filter.toUpperCase()) {
      case 'DAY':
        format = DateFormatPostgreSQL.DAY;
        break;
      case 'MONTH':
        format = DateFormatPostgreSQL.MONTH;
        break;
      default:
        format = DateFormatPostgreSQL.YEAR;
        break;
    }
    return await this.subscriptionsRepository
      .createQueryBuilder('subscription')
      .select('COUNT(subscription.id) AS number')
      .addSelect(`to_char(date(subscription.creationDate),'${format}') as date`)
      .groupBy('date')
      .orderBy('date')
      .execute();
  }

  async retreiveSalesCount(
    filter: string
  ): Promise<DateStatisticsResponseDto[]> {
    let format: string;
    switch (filter.toUpperCase()) {
      case 'MONTH':
        format = DateFormatPostgreSQL.MONTH;
        filter = 'month';
        break;
      default:
        format = DateFormatPostgreSQL.YEAR;
        filter = 'year';
        break;
    }
    return await this.subscriptionsRepository
      .createQueryBuilder('subscription')
      .select(
        `to_char(generate_series(subscription.creationDate, NOW(), interval  '1 ${filter}')::date,'${format}') as date`
      )
      .addSelect('sum(p.price) as number')
      .innerJoin('subscription.plan', 'p')
      .groupBy(
        `to_char(generate_series(subscription.creationDate, NOW(), interval  '1 ${filter}')::date,'${format}')`
      )
      .orderBy(
        `to_char(generate_series(subscription.creationDate, NOW(), interval  '1 ${filter}')::date,'${format}')`
      )
      .execute();
  }

  async retrieveMySubscriptions(userId: string): Promise<SubscriptionEntity[]> {
    return await this.subscriptionsRepository.find({
      relations: ['plan'],
      where: {
        user: { id: userId },
      },
    });
  }
}
