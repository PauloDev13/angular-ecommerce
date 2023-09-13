import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  currentCategoryId!: number;
  private productService: ProductService = inject(ProductService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe({
      next: () => this.listProduct(),
    });
  }

  listProduct() {
    const hasCategoryId = !!this.route.snapshot.params['id'];
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.params['id'];
    } else {
      this.currentCategoryId = 1;
    }
    return this.productService
      .getProductList(this.currentCategoryId)
      .subscribe({
        next: (data: Product[]) => {
          this.products = data;
        },
      });
  }

  ngOnDestroy() {
    this.listProduct().unsubscribe();
  }
}
