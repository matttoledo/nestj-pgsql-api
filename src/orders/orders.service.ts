import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddOrderDto } from './dtos/add-order.dto';
import { OrderRepository } from './order.repository'; 
import { Order, orderStatus } from './order.entity'
import { FindAllDto } from './dtos/find-all.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
    ){}

    async addOrder(addOrderDto: AddOrderDto): Promise <Order>{
        addOrderDto.status = orderStatus.INICIADO;
        return this.orderRepository.addOrder(addOrderDto);
    }

    async updateOrder(oldOrder: Order, newOrder: UpdateOrderDto): Promise<Order>{
        const order = this.orderRepository.merge(oldOrder, newOrder);
        return await this.orderRepository.save(order);
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
    async searchOrder(searchQuery: String): Promise<FindAllDto>{
        const orders = await this.orderRepository.createQueryBuilder().select()
            .where('name ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
            .orWhere('address ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
            .orWhere('phone ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
            .getMany();

        // const count = await this.customerRepository.count();

        return {listOrders:orders, count:orders.length}

    }
}
