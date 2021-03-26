import { Customer } from '../customer.entity';

export class FindAllDto {
    listCustomers: Customer[];
    count: number;
}