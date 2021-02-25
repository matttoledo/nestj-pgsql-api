import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ){}

    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>{
        return this.customerRepository.createCustomer(createCustomerDto);
    }
}


