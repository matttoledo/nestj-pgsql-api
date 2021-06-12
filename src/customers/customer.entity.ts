import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, Index,
} from 'typeorm';

@Entity()
@Unique(['phone', 'phone2', 'cpf'])
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @Index({ fulltext: true })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Index({ fulltext: true })
  @Column({ nullable: false, type: 'varchar', length: 400 })
  address: string;

  @Index({ fulltext: true })
  @Column({ nullable: false, type: 'varchar', length: 20 })
  phone: string;

  @Index({ fulltext: true })
  @Column({ nullable: false, type: 'varchar', length: 20 })
  phone2: string;

  @Column({ default: false })
  defaulter: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
