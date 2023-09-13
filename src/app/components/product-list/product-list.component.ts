import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId!: number;
  searchModel = false;
  private productService: ProductService = inject(ProductService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe({
      next: () => this.listProducts(),
    });
  }

  listProducts() {
    this.searchModel = this.route.snapshot.paramMap.has('keyword');
    if (this.searchModel) {
      this.handleSearchProducts();
    } else {
      this.handleListProduct();
    }
  }

  handleListProduct() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

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

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.params['keyword'];
    this.productService.searchProducts(theKeyword).subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
    });
  }
}
