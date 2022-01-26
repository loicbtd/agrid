import { CompanyEntity } from './company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => CompanyEntity, (company) => company.id, { nullable: true })
  company?: CompanyEntity;

  @CreateDateColumn()
  createdAt?: Date;
}
