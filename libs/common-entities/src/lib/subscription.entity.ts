import { UserEntity } from '@workspace/common/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user?: PlanEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.id)
  plan?: PlanEntity;

  @Column()
  creationDate?: Date;

  @Column()
  renewalDate?: Date;

  @Column()
  renewalCount?: number;
}
