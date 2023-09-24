import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IPurchase, IPurchaseResponse } from '../common/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly urlCheckout = `${environment.baseUrl}/checkout`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  placeOrder(purchase: IPurchase): Observable<IPurchaseResponse> {
    return this.httpClient.post<IPurchaseResponse>(
      `${this.urlCheckout}/purchase`,
      purchase,
    );
  }
}
