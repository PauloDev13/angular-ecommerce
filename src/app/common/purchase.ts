import { Address } from './address';
import { Customer } from './customer';
import {
  IAddress,
  ICustomer,
  IOrder,
  IOrderItem,
  IPurchase,
} from './interfaces/interfaces';
import { Order } from './order';
import { OrderItem } from './order-item';

export class Purchase implements IPurchase {
  readonly customer: ICustomer;
  readonly billingAddress: IAddress;
  readonly shippingAddress: IAddress;
  readonly order: IOrder;
  readonly orderItems: IOrderItem[] = [];

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
