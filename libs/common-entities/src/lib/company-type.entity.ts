import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company_type')
export class CompanyTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;
}
