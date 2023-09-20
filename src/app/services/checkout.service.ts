import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPurchase } from '../common/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly baseUrl = 'http://localhost:8080/api';
  private readonly httpClient: HttpClient = inject(HttpClient);

  placeOrder(purchase: IPurchase): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/checkout/purchase`, purchase);
  }
}
