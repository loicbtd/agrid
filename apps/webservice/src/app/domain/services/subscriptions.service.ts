import { PlanEntity } from './../../../../../../libs/common-entities/src/lib/plan.entity';
import { environment } from './../../../environments/environment';
import { UserEntity } from './../../../../../../libs/common-entities/src/lib/user.entity';
import { SubscribeRequest } from './../../../../../../libs/common-requests/src/lib/subscribe.request';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stripe } from 'stripe';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionsRepository: Repository<SubscriptionEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<SubscriptionEntity>,
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
    private readonly logger: Logger
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
      this.logger.error(`unknown plan`, error);
      throw new InternalServerErrorException('Plan inconnu');
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
      this.logger.error(
        `unable to charge the payment source for ${subscriptionRequest.email}`,
        error
      );
      throw new InternalServerErrorException(
        'Impossible de débiter le moyen de paiement'
      );
    }

    if (charge.outcome.type !== 'authorized') {
      this.logger.error(
        `unauthorized payment for ${subscriptionRequest.email}`
      );
      throw new NotFoundException('Impossible de débiter le moyen de paiement');
    }

    try {
      user = await this.usersRepository.create(user);
    } catch (error) {
      this.logger.error(`unable to create user ${user.email}`, error);
      throw new InternalServerErrorException('Plan inconnu');
    }

    let subscription: SubscriptionEntity = {
      user: user,
      plan: plan,
      creationDate: new Date(),
    };

    try {
      subscription = await this.subscriptionsRepository.create(subscription);
    } catch (error) {
      this.logger.error(
        `impossible to create subscription for plan ${plan.id} to ${user.email}`,
        error
      );
      throw new InternalServerErrorException();
    }

    return subscription;
  }
}
