import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddOrderDto } from './dtos/add-order.dto';
import { OrderRepository } from './order.repository'; 
import { Order } from './order.entity'

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
    ){}

    async addOrder(addOrderDto: AddOrderDto): Promise <Order>{
        return this.orderRepository.addOrder(addOrderDto);
    }
}
