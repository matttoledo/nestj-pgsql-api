import { orderCategory, orderStatus } from "../order.entity";

export class UpdateOrderDto{
    serviceOrder: bigint;
    orderDescription: string;
    deliveryDate: Date;
    totalValue: number;
    firstValue: number;
    deliveryValue: number;
    remaining: number;
    category: orderCategory;
    status: orderStatus;
    profit: number;
    cost: number;
}