import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';

export class Purchase {
  readonly customer: Customer;
  readonly billingAddress: Address;
  readonly shippingAddress: Address;
  readonly order: Order;
  readonly orderItems: OrderItem[] = [];

  constructor(
    customer: Customer,
    billingAddress: Address,
    shippingAddress: Address,
    order: Order,
    orderItems: OrderItem[],
  ) {
    this.customer = customer;
    this.billingAddress = billingAddress;
    this.shippingAddress = shippingAddress;
    this.order = order;
    this.orderItems = orderItems;
  }
}
