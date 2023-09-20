import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';

export class Purchase {
  constructor(
    public customer: Customer,
    public billingAddress: Address,
    public shippingAddress: Address,
    public order: Order,
    public orderItems: OrderItem[] = [],
  ) {}
}