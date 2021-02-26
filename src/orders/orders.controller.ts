import { Body, Controller, Post } from '@nestjs/common';
import { AddOrderDto } from './dtos/add-order.dto';
import { OrdersService } from './orders.service';
import { ReturnOrderDto } from './dtos/return-order-dto.dto' 

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService){}


    @Post()
    async addOrder (@Body() addOrderDto:AddOrderDto): Promise <ReturnOrderDto>{
        const order = await this.orderService.addOrder(addOrderDto);
        return{order, message:'Pedido cadastrado com sucesso'};

    }
}
