import { Module } from '@nestjs/common';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service'

@Module({
    imports:[TypeOrmModule.forFeature([OrderRepository])],
    controllers:[OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
