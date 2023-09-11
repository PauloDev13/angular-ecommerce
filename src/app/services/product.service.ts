import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from '../common/product';

interface IGetResponse {
  _embedded: {
    products: Product[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // constructor() {}
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/products';

  getProductList(): Observable<Product[]> {
    return this.httpClient
      .get<IGetResponse>(this.baseUrl)
      .pipe(map(response => response._embedded.products));
  }
}
