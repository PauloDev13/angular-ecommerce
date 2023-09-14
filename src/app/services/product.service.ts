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
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string) {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<IGetResponseProductCategory>(`${this.baseUrl}/product-category`)
      .pipe(map(response => response._embedded.productCategory));
  }

  getProductDetails(productId: number): Observable<Product> {
    console.log('ID NO SERVICE ', productId);
    return this.httpClient.get<Product>(
      `${this.baseUrl}/products/${productId}`,
    );
  }

  private getProducts(getUrl: string) {
    return this.httpClient
      .get<IGetResponseProducts>(getUrl)
      .pipe(map(response => response._embedded.products));
  }
}
