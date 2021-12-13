import { Injectable } from '@nestjs/common';
import { PlanEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InitializationService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>
  ) {}
}
