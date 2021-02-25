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
  @Unique(['phone'])
  export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;
  
    @Column({ nullable: false, type: 'varchar', length: 400 })
    address: string;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    phone: string;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    phone2: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }