import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { AddOrderDto } from './dtos/add-order.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async addOrder(addOrderDto: AddOrderDto): Promise <Order>{
        const {serviceOrder, orderDescription, deliveryDate, totalValue, firstValue, deliveryValue, remaining, customerId} = addOrderDto;
        
        const order = this.create()
        order.serviceOrder = serviceOrder;
        order.orderDescription = orderDescription;
        order.deliveryDate = deliveryDate;
        order.totalValue = totalValue;
        order.firstValue = firstValue;
        order.remaining = remaining;
        order.customerId = customerId;
        order.deliveryValue = deliveryValue;


        try {
            await order.save();
            return order;
        } catch(error){
            if (error.code.toString()==='23505'){
                throw new ConflictException('Pedido já cadastrado');

            } else {
                console.log(error);
                throw new InternalServerErrorException('Erro ao salvar o pedido no banco de dados')
            }
        } 

    }
}