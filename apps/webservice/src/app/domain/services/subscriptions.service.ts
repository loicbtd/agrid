import { Inject, Injectable } from '@nestjs/common';
import {
  PlanEntity,
  SubscriptionEntity,
  UserEntity,
} from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stripe } from 'stripe';
import { InitiateSubscriptionRequest } from '@workspace/common/requests';
import { UnabilityToRetrievePlans } from '../errors/unability-to-retrieve-plans.error';
import { UnabilityToSaveUserError as UnabilityToSaveUserError } from '../errors/unability-to-create-user.error';
import { DateFormatPostgreSQL } from '../enumerations/date-format-postgresql.enumeration';
import {
  DateStatisticsResponseDto,
  InitiateSubscriptionResponse,
} from '@workspace/common/responses';
import { STRIPE } from '../constants/provider-names.constant';
import { StripeError } from '../errors/stripe.error';
import { UnabilityToRetrieveUsersError } from '../errors/unability-to-retrieve-users.error';
import { UnabilityToRetrieveSubscriptionsError } from '../errors/unability-to-retrieve-subscriptions.error';
import { AlreadyActiveSubscriptionError } from '../errors/already-active-subscription.error';
import { UnabilityToSaveSubscriptionsError } from '../errors/unability-to-save-subscriptions.error';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
    @Inject(STRIPE)
    private readonly stripe: Stripe
  ) {}

  async initiateSubscription(
    command: InitiateSubscriptionRequest
  ): Promise<InitiateSubscriptionResponse> {
    let plan: PlanEntity;
    try {
      plan = await this.plansRepository.findOneOrFail(command.planId);
    } catch (error: any) {
      throw new UnabilityToRetrievePlans(error.message);
    }

    const userAlreadyExists =
      (await this.usersRepository.count({ email: command.email })) > 0;

    let user: UserEntity;
    if (!userAlreadyExists) {
      try {
        user = await this.usersRepository.save({
          email: command.email,
          firstname: command.firstname,
          lastname: command.lastname,
        });
      } catch (error: any) {
        throw new UnabilityToSaveUserError(error.message);
      }
    } else {
      try {
        user = await this.usersRepository.findOneOrFail({
          email: command.email,
        });
      } catch (error: any) {
        throw new UnabilityToRetrieveUsersError(error.message);
      }
    }

    if (!user.stripeCustomerId) {
      try {
        user.stripeCustomerId = (
          await this.stripe.customers.create({
            email: command.email,
          })
        ).id;
      } catch (error: any) {
        throw new StripeError(error.message);
      }

      try {
        user = await this.usersRepository.save(user);
      } catch (error: any) {
        throw new UnabilityToSaveUserError(error.message);
      }
    }

    let subscription: SubscriptionEntity;
    try {
      subscription = await this.subscriptionsRepository.findOne({
        user: user,
        plan: plan,
      });
    } catch (error: any) {
      throw new UnabilityToRetrieveSubscriptionsError(error.message);
    }

    if (!subscription) {
      try {
        subscription = await this.subscriptionsRepository.save({
          user: user,
          plan: plan,
          active: false,
          relations: ['user', 'plan'],
        });
      } catch (error: any) {
        throw new UnabilityToRetrieveSubscriptionsError(error.message);
      }
    }

    if (subscription.active) {
      throw new AlreadyActiveSubscriptionError();
    }

    let stripeSubscription: Stripe.Subscription;
    try {
      stripeSubscription = await this.stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [
          {
            price: plan.stripeProductPriceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
    } catch (error: any) {
      throw new StripeError(error.message);
    }

    subscription.stripeSubscriptionId = stripeSubscription.id;

    try {
      subscription = await this.subscriptionsRepository.save(subscription);
    } catch (error: any) {
      throw new UnabilityToSaveSubscriptionsError(error.message);
    }

    return {
      clientSecret: (
        (stripeSubscription.latest_invoice as Stripe.Invoice)
          .payment_intent as Stripe.PaymentIntent
      ).client_secret,
    };
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
      .addSelect(`to_char(date(subscription.createdAt),'${format}') as date`)
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
        `to_char(generate_series(subscription.createdAt, NOW(), interval  '1 ${filter}')::date,'${format}') as date`
      )
      .addSelect('sum(p.price) as number')
      .innerJoin('subscription.plan', 'p')
      .groupBy(
        `to_char(generate_series(subscription.createdAt, NOW(), interval  '1 ${filter}')::date,'${format}')`
      )
      .orderBy(
        `to_char(generate_series(subscription.createdAt, NOW(), interval  '1 ${filter}')::date,'${format}')`
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
