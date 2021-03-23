export class AddOrderDto{
    id: string;
    serviceOrder: bigint;
    orderDescription: string;
    deliveryDate: Date;
    totalValue: number;
    firstValue: number;
    deliveryValue: number;
    remaining: number;
    customerId: string;
    category: string;
    status: string;
    profit: number;
    cost: number;
}