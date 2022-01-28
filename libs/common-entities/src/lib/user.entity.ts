import { OrganizationEntity } from './organization.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GlobalRoleOfUserEntity } from '..';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ default: true })
  mustDefinePassword?: boolean;

  @Column()
  firstname?: string;

  @Column()
  lastname?: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.id, {
    nullable: true,
  })
  company?: OrganizationEntity;

  @CreateDateColumn()
  createdAt?: Date;
}
