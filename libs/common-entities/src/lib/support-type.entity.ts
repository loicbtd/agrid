import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_type')
export class SupportTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;
}
