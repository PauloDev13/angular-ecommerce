import { Component, inject, OnInit } from '@angular/core';

import { IProductCategory } from '../../common/interfaces/interfaces';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: IProductCategory[] = [];
  private readonly productService: ProductService = inject(ProductService);

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: (item: IProductCategory[]) => {
        this.productCategories = item;
      },
    });
  }
}
