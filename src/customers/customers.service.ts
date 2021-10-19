import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { Customer } from './customer.entity';
import { DeleteResult } from 'typeorm';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ){}

    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>{
        return this.customerRepository.createCustomer(createCustomerDto);
    }

    async findCustomersByIds(ids: string[]): Promise<Customer[]>{
        const customer = await this.customerRepository.createQueryBuilder("customer")
                                                .where("customer.id in (:...id)", {id: ids})
                                                .getMany();
        console.log(customer)
        if (!customer) throw new NotFoundException('Cliente não encontrado');
        
        return customer;
    }
    async findCustomerById(id: string): Promise<Customer>{
        // const customer = this.customerRepository.createQueryBuilder("customer")
        //                                         .where("customer.id =:id",{ id: id})
        //                                         .getOne();

        const customer = this.customerRepository.findOne(id);


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
    

    async findAllCustomers(): Promise<FindAllDto>{
        const listCustomers = await this.customerRepository.find();
        const count = await this.customerRepository.count();

        return {listCustomers, count};
    }

    async deleteCustomerById(id: string): Promise<DeleteResult>{
        const customer = await this.customerRepository.delete(id);
        if (!customer) throw new NotFoundException('Cliente não encontrado');
        return new DeleteResult;

}

    async updateCustomer(oldCustomer: Customer, newCustomer:UpdateCustomerDto): Promise<Customer>{
        const customer = this.customerRepository.merge(oldCustomer, newCustomer);

        return await this.customerRepository.save(customer);
    }

    async searchCostumer(searchQuery: String): Promise<FindAllDto>{
        const customers = await this.customerRepository.createQueryBuilder().select()
                .where('name ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
                .orWhere('address ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
                .orWhere('phone ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
                .getMany();

        // const count = await this.customerRepository.count();

        return {listCustomers:customers, count:customers.length}

    }

}