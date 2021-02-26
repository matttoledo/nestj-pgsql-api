
import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  @Unique(['serviceOrder'])
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryGeneratedColumn('increment')
    serviceOrder: bigint;

    @Column({ nullable: false, type: 'varchar', length: 500 })
    orderDescription: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: false})
    deliveryDate: Date;

    @Column({ nullable: false, type: 'real'})
    totalValue: number;

    @Column({ nullable: false, type: 'real'})
    firstValue: number;

    @Column({ nullable: false, type: 'real'})
    deliveryValue: number;

    @Column({ nullable: false, type: 'real'})
    remaining: number;
  
    @Column()
    customerId: string;

    @UpdateDateColumn()
    updatedAt: Date;

  }