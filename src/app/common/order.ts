import { IOrder } from './interfaces/interfaces';

export class Order implements IOrder {
  readonly totalPrice: number;
  readonly totalQuantity: number;

  constructor(totalPrice: number, totalQuantity: number) {
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
  }
}
