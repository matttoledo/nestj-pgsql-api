import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddOrderDto } from './dtos/add-order.dto';
import { OrderRepository } from './order.repository'; 
import { Order } from './order.entity'
import { FindAllDto } from './dtos/find-all.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
    ){}

    async addOrder(addOrderDto: AddOrderDto): Promise <Order>{
        return this.orderRepository.addOrder(addOrderDto);
    }


    async findAllOrders(): Promise<FindAllDto>{
        const listOrders = await this.orderRepository.find();
        const count = await this.orderRepository.count();

        return {listOrders, count};
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
                                    .where("order.customerId=:id",{id: id})
                                    .getMany();

    }    
    async listOrdersByCategory(id: string): Promise<Order[]>{
        return this.orderRepository.createQueryBuilder("order")
                                    .where("order.category=:id",{id: id})
                                    .getMany();

    } 
    
    async listOrdersByStatus(id: string): Promise<Order[]>{
        return this.orderRepository.createQueryBuilder("order")
                                    .where("order.status=:id",{id: id})
                                    .getMany();

    }
}
