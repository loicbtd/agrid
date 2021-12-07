import { PlanEntity } from './plan.entity';
import { Entity, ManyToOne } from 'typeorm';
import { ServiceEntity } from './service.entity';

@Entity('service_included_in_plan')
export class ServiceIncludedInPlanEntity {
  @ManyToOne(() => ServiceEntity, (service) => service.id, { primary: true })
  service!: ServiceEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.id, { primary: true })
  plan!: PlanEntity;
}
