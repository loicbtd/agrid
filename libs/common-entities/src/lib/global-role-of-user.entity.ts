import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';
import { UserEntity } from '..';

@Entity('global_role_of_user')
export class GlobalRoleOfUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user?: UserEntity;

  @Column({
    type: 'enum',
    enum: GlobalRoleEnumeration,
  })
  role?: GlobalRoleEnumeration;
}
