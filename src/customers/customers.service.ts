import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { Customer } from './customer.entity';
import { DeleteCustomerDto } from './dtos/delete-customer.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ){}

    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>{
        return this.customerRepository.createCustomer(createCustomerDto);
    }

    async findCustomerById(id: string): Promise<Customer>{
        debugger
        const customer = await this.customerRepository.findOne(id,{
            select:['id','name','cpf','address','phone','phone2','defaulter'],
        })
        if (!customer) throw new NotFoundException('Cliente não encontrado');

        return customer;
    }

    async findCustomerByphone(phone: string): Promise<Customer>{
        const customer = this.customerRepository.createQueryBuilder("customer")
                                                .where("customer.phone =:id",{ id: phone})
                                                .orWhere("customer.phone2 =:id",{ id: phone})
                                                .getOne();

        if (!customer) throw new NotFoundException('Cliente não encontrado');

        return customer;
    }
    

    async findAllCustomers(): Promise<Customer[]>{
        return await this.customerRepository.find();
    }

    async deleteCustomerById(id: string): Promise<DeleteResult>{
        const customer = await this.customerRepository.delete(id);
        if (!customer) throw new NotFoundException('Cliente não encontrado');
        return new DeleteResult;

}

}