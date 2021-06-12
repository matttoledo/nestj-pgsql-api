import { orderCategory, orderStatus } from "../order.entity";

export class AddOrderDto {
    id: string;
    serviceOrder: bigint;
    orderDescription: orderStatus;
    deliveryDate: Date;
    totalValue: number;
    firstValue: number;
    deliveryValue: number;
    remaining: number;
    customerId: string;
    category: orderCategory;
    status: orderStatus;
    profit: number;
    cost: number;
}