import { environment } from './../../../environments/environment';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  PlanEntity,
  SubscriptionEntity,
  UserEntity,
} from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stripe } from 'stripe';
import { SubscribeRequest } from '@workspace/common/requests';

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
      throw new InternalServerErrorException(
        'impossible de débiter le moyen de paiement'
      );
    }

    if (charge.outcome.type !== 'authorized') {
      throw new BadRequestException(
        'impossible de débiter le moyen de paiement'
      );
    }

    try {
      user = await this.usersRepository.create(user);
    } catch (error) {
      throw new InternalServerErrorException('plan inconnu');
    }

    let subscription: SubscriptionEntity = {
      user: user,
      plan: plan,
      creationDate: new Date(),
    };

    try {
      subscription = await this.subscriptionsRepository.create(subscription);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return subscription;
  }
}
