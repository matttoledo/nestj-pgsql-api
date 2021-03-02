import { Customer } from '../customer.entity';

export class DeleteCustomerDto {
    customer: Customer;
    message: string;
}