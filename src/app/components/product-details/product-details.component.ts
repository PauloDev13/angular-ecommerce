import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartItem } from '../../common/cart-item';
import { IProduct } from '../../common/interfaces/interfaces';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct = new Product(0, '', '', '', 0.0, '');
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly productService: ProductService = inject(ProductService);
  private readonly cartService: CartService = inject(CartService);

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    const productId = +this.route.snapshot.params['id'];
    if (productId) {
      this.productService.getProductDetails(productId).subscribe({
        next: (data: IProduct) => {
          this.product = data;
        },
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(new CartItem(this.product));
  }
}
