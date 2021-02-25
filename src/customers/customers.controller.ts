import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { ReturnCustomerDto } from './dtos/return-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService){}



    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise <ReturnCustomerDto>{
        const customer = await this.customersService.createCustomer(createCustomerDto);
        return {customer, message:'Cliente cadastrado com sucesso'};

    }
}
