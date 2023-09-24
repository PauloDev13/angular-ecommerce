import { Component, inject, OnInit } from '@angular/core';

import { ICartItem } from '../../common/interfaces/interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice = 0.0;
  totalQuantity = 0;
  private readonly cartService: CartService = inject(CartService);

  ngOnInit() {
    this.listCartDetails();
  }

  incrementQuantity(theCartItem: ICartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: ICartItem) {
    this.cartService.removeToCart(theCartItem);
  }

  removeCartItem(theCartItem: ICartItem) {
    this.cartService.remove(theCartItem);
  }

  private listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe({
      next: (data: number) => {
        this.totalPrice = data;
      },
    });

    this.cartService.totalQuantity.subscribe({
      next: (data: number) => {
        this.totalQuantity = data;
      },
    });

    this.cartService.computeCartTotal();
  }
}
