import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  IGetResponseProductCategory,
  IGetResponseProducts,
} from '../common/interfaces/interfaces';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly urlProducts = `${environment.baseUrl}/products`;

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.urlProducts}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(
    thePageNumber: number,
    thePageSize: number,
    theCategoryId: number,
  ): Observable<IGetResponseProducts> {
    const searchUrl = `${this.urlProducts}/search/findByCategoryId?id=${theCategoryId}
    &page=${thePageNumber}&size=${thePageSize}`;

    return this.httpClient.get<IGetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyword: string) {
    const searchUrl = `${this.urlProducts}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductListPaginate(
    thePageNumber: number,
    thePageSize: number,
    theKeyword: string,
  ): Observable<IGetResponseProducts> {
    const searchUrl = `${this.urlProducts}/search/findByNameContaining?name=${theKeyword}&page=${thePageNumber}&size=${thePageSize}`;

    return this.httpClient.get<IGetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<IGetResponseProductCategory>(
        `${environment.baseUrl}/product-category`,
      )
      .pipe(map(response => response._embedded.productCategory));
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.urlProducts}/${productId}`);
  }

  private getProducts(getUrl: string) {
    return this.httpClient
      .get<IGetResponseProducts>(getUrl)
      .pipe(map(response => response._embedded.products));
  }
}
