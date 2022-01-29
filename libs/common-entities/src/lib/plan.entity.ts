import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column()
  price?: number;

  @Column()
  stripeProductId?: string;

  @Column()
  stripeProductPriceId?: string;
}
