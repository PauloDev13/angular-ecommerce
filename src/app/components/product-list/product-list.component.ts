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
  currentCategoryId = 1;
  previousCategoryId = 1;
  searchModel = false;

  // properties for pagination
  thePageNumber = 2;
  thePageSize = 5;
  theTotalElements = 0;

  private productService: ProductService = inject(ProductService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe({
      next: () => {
        this.listProducts();
      },
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

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log('Page', this.thePageNumber);

    return this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId,
      )
      .subscribe({
        next: data => {
          console.log('PAGINATION', data.page);
          // this.products = data._embedded.products;
          // this.thePageNumber = data.page.number + 1;
          // this.thePageSize = data.page.size;
          // this.theTotalElements = data.page.totalElements;
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
