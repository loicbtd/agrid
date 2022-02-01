import { Injectable } from '@nestjs/common';
import { PlanEntity } from '@workspace/common/entities';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from '../errors/entity-not-found.error';
import { UpdatePlanRequest } from '@workspace/common/requests';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>
  ) {}

  async create(plan: PlanEntity): Promise<PlanEntity> {
    let newPlan: PlanEntity;

    try {
      newPlan = await this.plansRepository.save(plan);
    } catch (error: any) {
      throw new EntityNotFoundError(error.message, PlanEntity.constructor.name);
    }

    return newPlan;
  }

  async retrieve(): Promise<PlanEntity[]> {
    let plans: PlanEntity[];

    try {
      plans = await this.plansRepository.find();
    } catch (error) {
      throw new EntityNotFoundError(error.message, PlanEntity.constructor.name);
    }

    return plans.sort((planA, planB) => planA.price - planB.price);
  }

  async update(id: string, command: UpdatePlanRequest): Promise<void> {
    let plan: PlanEntity;
    try {
      plan = await this.plansRepository.findOne(id);
    } catch (error) {
      throw new EntityNotFoundError(error.message, PlanEntity.constructor.name);
    }
    plan.name = command.name;
    plan.price = command.price;
    plan.stripeProductId = command.stripeProductId;
    plan.stripeProductPriceId = command.stripeProductPriceId;
    await this.plansRepository.save(plan);
  }

  async delete(planId: string): Promise<DeleteResult> {
    return await this.plansRepository.delete({ id: planId });
  }
}
