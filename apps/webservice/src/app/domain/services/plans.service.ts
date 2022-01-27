import { Injectable } from '@nestjs/common';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from '../errors/entity-not-found.error';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>
  ) {}

  async create(plan: PlanEntity): Promise<PlanEntity> {
    let newPlan: PlanEntity;

    try {
      newPlan = this.plansRepository.create(plan);
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
}
