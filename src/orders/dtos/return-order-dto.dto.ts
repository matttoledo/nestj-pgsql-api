import { Order } from '../order.entity';

export class ReturnOrderDto {
  order: Order;
  message: string;
}