import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization_type')
export class OrganizationTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;
}
