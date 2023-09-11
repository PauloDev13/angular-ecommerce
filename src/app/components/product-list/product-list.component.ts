import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productService: ProductService = inject(ProductService);

  ngOnInit() {
    this.listProduct();
  }

  listProduct() {
    return this.productService.getProductList().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
    });
  }

  ngOnDestroy() {
    this.listProduct().unsubscribe();
  }
}
