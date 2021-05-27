import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

@Module({
  imports: [ConfigModule.forRoot(),
            TypeOrmModule.forRoot(typeOrmConfig),
            CustomersModule, 
            OrdersModule, 
            ProductsModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
