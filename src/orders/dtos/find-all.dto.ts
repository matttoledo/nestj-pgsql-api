import { Order } from '../order.entity';

export class FindAllDto {
    listOrders: Order[];
    count: number;
}