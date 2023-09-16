import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import {
  IGetResponseProducts,
  ProductService,
} from '../../services/product.service';

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
  previousKeyword = '';
  searchModel = false;

  // properties for pagination
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;

  private productService: ProductService = inject(ProductService);
  private readonly cartService: CartService = inject(CartService);
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

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId,
      )
      .subscribe(this.processResult());
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.params['keyword'];

    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService
      .searchProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword,
      )
      .subscribe(this.processResult());
  }

  addToCart(theProduct: Product) {
    this.cartService.addToCart(new CartItem(theProduct));
    console.log(
      `Adicionando Product: ${theProduct.name}, ${theProduct.unitPrice}`,
    );
  }

  updatePageSize(event: Event) {
    const pageSize = (event.target as HTMLInputElement).value;
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  private processResult() {
    return (data: IGetResponseProducts) => {
      this.products = data._embedded.products;
      // this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
