import { IOrderHistory } from './interfaces/interfaces';

export class OrderHistory implements IOrderHistory {
  readonly id: string;
  readonly orderTrackingNumber: string;
  readonly totalPrice: number;
  readonly totalQuantity: number;
  readonly dateCreated: Date;

  constructor(
    private id: string,
    private orderTrackingNumber: string,
    private totalPrice: number,
    private totalQuantity: number,
    private dateCreated: Date,
  ) {
    this.id = id;
    this.orderTrackingNumber = orderTrackingNumber;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
    this.dateCreated = dateCreated;
  }
}
