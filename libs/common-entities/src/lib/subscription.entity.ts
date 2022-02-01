import { UserEntity } from '../lib/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user?: UserEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.id)
  plan?: PlanEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @Column({ nullable: true })
  stripeSubscriptionId: string;

  @Column()
  active: boolean;
}
