import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IGetResponseOrderHistory } from '../common/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private readonly urlOrderHistory = `${environment.baseUrl}/orders`;

  private readonly httpClient: HttpClient = inject(HttpClient);

  getOrderHistory(theEmail: string): Observable<IGetResponseOrderHistory> {
    return this.httpClient.get<IGetResponseOrderHistory>(
      `${this.urlOrderHistory}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`,
    );
  }
}
