import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  addToCart(theCartItem: CartItem): void {
    let alreadyExistsInCart = false;
    let existingCartItem: any = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        tempCartItem => tempCartItem.id === theCartItem.id,
      );
    }

    alreadyExistsInCart = existingCartItem !== undefined;

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotal();
  }

  removeToCart(theCartItem: CartItem): void {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotal();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === theCartItem.id,
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
