import { SupportTypeEntity } from './support-type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column('float')
  price?: number;

  @ManyToOne(() => SupportTypeEntity, (supportType) => supportType.id)
  supportType?: SupportTypeEntity;
}
