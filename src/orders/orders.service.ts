import { Injectable, NotFoundException } from '@nestjs/common';
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


    async findAllOrders(): Promise<Order[]>{
        return await this.orderRepository.find();
    }

    async findOrderById(id: string): Promise<Order>{
        const order = this.orderRepository.createQueryBuilder("order")
                                                .where("order.id =:id",{ id: id})
                                                .getOne();
        if (!order) throw new NotFoundException('Pedido não encontrado!');

        return order;
    }

    async findOrderByServiceOrder(id: string): Promise<Order>{
        const order = this.orderRepository.createQueryBuilder("order")
                                                .where("order.serviceOrder =:id",{ id: id})
                                                .getOne();
        if (!order) throw new NotFoundException('Pedido não encontrado!');

        return order;
    }

    async listOrdersByCustomerId(id: string): Promise<Order[]>{
        return this.orderRepository.createQueryBuilder("order")
                                    .where("order.customerId=:id")
                                    .getMany();

    }    
}
