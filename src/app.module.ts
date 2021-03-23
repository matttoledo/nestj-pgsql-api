import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

@Module({
  imports: [ConfigModule.forRoot(),
            TypeOrmModule.forRoot(typeOrmConfig),
            CustomersModule, 
            OrdersModule, 
            ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
