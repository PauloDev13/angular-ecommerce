import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPurchase, IPurchaseResponse } from '../common/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly baseUrl = 'http://localhost:8080/api';
  private readonly httpClient: HttpClient = inject(HttpClient);

  placeOrder(purchase: IPurchase): Observable<IPurchaseResponse> {
    return this.httpClient.post<IPurchaseResponse>(
      `${this.baseUrl}/checkout/purchase`,
      purchase,
    );
  }
}
