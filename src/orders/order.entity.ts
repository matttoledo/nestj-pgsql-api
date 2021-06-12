
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

    @CreateDateColumn()
    createDate: Date;

    @Column({ nullable: false, type: 'real'})
    totalValue: number;

    @Column({ nullable: false, type: 'real'})
    firstValue: number;

    @Column({ nullable: false, type: 'real'})
    deliveryValue: number;

    @Column({ nullable: false, type: 'real'})
    remaining: number;

    @Column({ nullable: false, type: 'real'})
    profit: number;

    @Column({ nullable: false, type: 'real'})
    cost: number;

    @Column()
    customerId: string;

    @Column()
    category: orderCategory;

    @Column()
    status: orderStatus;

    @UpdateDateColumn()
    updatedAt: Date;

  }


export enum orderStatus {
    INICIADO ="INICIADO",
    PRODUÇÃO = "PRODUÇÃO",
    ROTA_DE_ENTREGA = "ROTA DE ENTREGA",
    ENTREGUE = "ENTREGUE"
}

export enum orderCategory {
  VIDRO_TEMPERADO = "VIDRO TEMPERADO",
  ALUMINIO = "ALUMÍNIO",
  PVC = "PVC",
  
}