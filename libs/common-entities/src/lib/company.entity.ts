import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyTypeEntity } from './company-type.entity';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => CompanyTypeEntity, (companyType) => companyType.id)
  companyType?: CompanyTypeEntity;

  @Column()
  name?: string;

  @Column('float', { nullable: true })
  latitude?: number;

  @Column('float', { nullable: true })
  longitude?: number;
}
