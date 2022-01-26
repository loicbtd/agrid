import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationTypeEntity } from './organization-type.entity';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(
    () => OrganizationTypeEntity,
    (organizationType) => organizationType.id
  )
  organizationType?: OrganizationTypeEntity;

  @Column()
  name?: string;

  @Column('float', { nullable: true })
  latitude?: number;

  @Column('float', { nullable: true })
  longitude?: number;
}
