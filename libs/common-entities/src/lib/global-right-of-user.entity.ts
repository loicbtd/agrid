import { PlanEntity } from './plan.entity';
import { Entity, ManyToOne } from 'typeorm';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';
import { UserEntity } from '..';

@Entity('global_role_of_user')
export class GlobalRightOfUserEntity {
  @ManyToOne(() => UserEntity, (user) => user.id, { primary: true })
  user?: UserEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.id, { primary: true })
  right?: GlobalRoleEnumeration;
}
