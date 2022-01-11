import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
    private readonly logger: Logger
  ) {}

  async create(plan: PlanEntity): Promise<PlanEntity> {
    let newPlan: PlanEntity;

    try {
      newPlan = await this.plansRepository.create(plan);
    } catch (error) {
      this.logger.error(`impossible to find entities`, error);
      throw new InternalServerErrorException();
    }

    return newPlan;
  }

  async retrieve(): Promise<PlanEntity[]> {
    let plans: PlanEntity[];

    try {
      plans = await this.plansRepository.find();
    } catch (error) {
      this.logger.error(`impossible to find entities`, error);
      throw new InternalServerErrorException();
    }

    return plans;
  }
}
