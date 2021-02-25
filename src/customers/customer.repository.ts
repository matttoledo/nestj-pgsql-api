import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const {name, address, phone, phone2} = createCustomerDto;

        const customer = this.create();
        customer.name = name;
        customer.address = address;
        customer.phone = phone;
        customer.phone2 = phone2;

        try {
            await customer.save();
            return customer;
        } catch (error){
            if (error.code.toString()==='23505'){
                throw new ConflictException('Cliente já cadastrado');
            }else{
                throw new InternalServerErrorException ('Error ao salvar o cliente no banco');
            }
        }

    }
}