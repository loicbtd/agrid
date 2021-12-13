import { CompanyEntity } from './company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RightEnumeration } from '@workspace/common/enumerations';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({
    type: 'enum',
    enum: RightEnumeration,
    array: true,
    default: [],
  })
  rights: RightEnumeration[];

  @Column()
  firstname?: string;

  @Column()
  lastname?: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id)
  company?: CompanyEntity;
}
