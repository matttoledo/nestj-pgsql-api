import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CustomersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
