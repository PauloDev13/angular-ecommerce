import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IGetResponseOrderHistory } from '../common/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private readonly baseUrl = 'http://localhost:8080/api';

  private readonly httpClient: HttpClient = inject(HttpClient);

  getOrderHistory(theEmail: string): Observable<IGetResponseOrderHistory> {
    return this.httpClient.get<IGetResponseOrderHistory>(
      `${this.baseUrl}/orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`,
    );
  }
}
