export class UpdateOrderDto{
    serviceOrder: bigint;
    orderDescription: string;
    deliveryDate: Date;
    totalValue: number;
    firstValue: number;
    deliveryValue: number;
    remaining: number;
    category: string;
    status: string;
    profit: number;
    cost: number;
}