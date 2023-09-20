import { CartItem } from './cart-item';
import { IOrderItem } from './interfaces/interfaces';

export class OrderItem implements IOrderItem {
  readonly imageUrl: string;
  readonly unitPrice: number;
  readonly quantity: number;
  readonly productId: number;

  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
