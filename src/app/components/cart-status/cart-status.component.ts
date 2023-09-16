import { Component, inject, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalPrice = 0.0;
  totalQuantity = 0;
  private readonly cartService: CartService = inject(CartService);

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe({
      next: (data: number) => {
        console.log('total preço', data);
        this.totalPrice = data;
      },
    });

    this.cartService.totalQuantity.subscribe({
      next: (data: number) => {
        console.log('total quantidade', data);
        this.totalQuantity = data;
      },
    });
  }
}
