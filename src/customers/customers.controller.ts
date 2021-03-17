import { Body, Controller, Delete, Get, Post, Patch, Param, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { ReturnCustomerDto } from './dtos/return-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto'
import { Customer } from './customer.entity';
import { DeleteResult } from 'typeorm';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService){}

    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise <ReturnCustomerDto>{
        debugger
        const customer = await this.customersService.createCustomer(createCustomerDto);
        debugger
        return {customer, message:'Cliente cadastrado com sucesso'};

    }

    @Get('customer/:id')
    async findCustomerById(@Param('id') id: string): Promise <Customer>{
        const customer = await this.customersService.findCustomerById(id);
        return customer;
        
    }

    @Get('phone/:id')
    async findCustomerByphone(@Param('id') id: string): Promise <ReturnCustomerDto>{
        const customer = await this.customersService.findCustomerByphone(id);
        return {customer, message:'Cliente Encontrado!'};
    }

    @Put("update")
    async updateCustomer(@Body() newCustomer: UpdateCustomerDto): Promise <Customer>{
        return await this.customersService.updateCustomer(newCustomer);  
    }
    

    @Get("all")
    async getAllCustomers(): Promise <Customer[]>{
        return await this.customersService.findAllCustomers();
    }

    @Delete("deleteId")
    async deleteCustomerById(@Body() id: string): Promise <DeleteResult>{
        return await this.customersService.deleteCustomerById(id);
    }



}
