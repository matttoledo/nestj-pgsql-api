import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AddOrderDto } from './dtos/add-order.dto';
import { OrdersService } from './orders.service';
import { ReturnOrderDto } from './dtos/return-order-dto.dto'
import { Order } from './order.entity'

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService){}


    @Post()
    async addOrder (@Body() addOrderDto:AddOrderDto): Promise <ReturnOrderDto>{
        const order = await this.orderService.addOrder(addOrderDto);
        return{order, message:'Pedido cadastrado com sucesso'};

    }

    @Get("all")
    async getAllOrders(): Promise <Order[]>{
        return await this.orderService.findAllOrders();
    }

    @Get('orderId/:id')
    async findOrderById(@Param('id') id: string): Promise <Order>{
        const order = await this.orderService.findOrderById(id);
        return order;
        
    }

    @Get('order/:id')
    async findOrderByServiceOrder(@Param('id') id: string): Promise <Order>{
        const order = await this.orderService.findOrderByServiceOrder(id);
        return order;
        
    }

    @Get('ordersByCustomer/:id')
    async listOrdersByCustomerId(@Param('id') id:string): Promise <Order[]>{
        return this.orderService.listOrdersByCustomerId(id);
    }

    @Get('ordersByCategory/:id')
    async listOrdersByCategory(@Param('id') id:string): Promise <Order[]>{
        return this.orderService.listOrdersByCustomerId(id);
    }

    @Get('ordersByStatus/:id')
    async listOrdersByStatus(@Param('id') id:string): Promise <Order[]>{
        return this.orderService.listOrdersByCustomerId(id);
    }


}
