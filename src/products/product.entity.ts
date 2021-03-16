
import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';


  @Entity()
  @Unique(['sku'])
  export class Product extends BaseEntity {

      @PrimaryGeneratedColumn('uuid')
      sku: string;

      @Column()
      category: string;

      @Column()
      name: string;

      @Column()
      measure: string;

      @Column()
      color: String;

      

  }
