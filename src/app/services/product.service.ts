import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

interface IGetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface IGetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // constructor() {}
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  getProductList(categoryId: number): Observable<Product[]> {
    return this.httpClient
      .get<IGetResponseProducts>(
        `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`,
      )
      .pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<IGetResponseProductCategory>(`${this.baseUrl}/product-category`)
      .pipe(map(response => response._embedded.productCategory));
  }
}
