import { Body, Controller, Get, Post, Param, Res } from '@nestjs/common';
import { AddOrderDto } from './dtos/add-order.dto';
import { OrdersService } from './orders.service';
import { ReturnOrderDto } from './dtos/return-order-dto.dto';
import { Order } from './order.entity';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService){}


    @Post()
    async addOrder (@Body() addOrderDto:AddOrderDto): Promise <ReturnOrderDto>{
        const order = await this.orderService.addOrder(addOrderDto);
        return{order, message:'Pedido cadastrado com sucesso'};

    }

    @Get()
    async getAllOrders(@Res() res: Response): Promise <Order[]>{
        const orders = await this.orderService.findAllOrders();
        res.header('X-Total-Count', orders.count.toString())
        res.send(orders.listOrders);
        return (orders.listOrders);
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
// nenhum endpoint retornando daqui pra baixo
    @Get('ordersByCategory/:id')
    async listOrdersByCategory(@Param('id') id:string): Promise <Order[]>{
        return this.orderService.listOrdersByCustomerId(id);
    }

    @Get('ordersByStatus/:id')
    async listOrdersByStatus(@Param('id') id:string): Promise <Order[]>{
        return this.orderService.listOrdersByCustomerId(id);
    }


}
