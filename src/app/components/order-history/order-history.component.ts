import { Component, inject, OnInit } from '@angular/core';

import {
  IGetResponseOrderHistory,
  IOrderHistory,
} from '../../common/interfaces/interfaces';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: IOrderHistory[] = [];
  userEmail: string | null = '';

  private readonly orderHistoryService: OrderHistoryService =
    inject(OrderHistoryService);

  ngOnInit() {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    this.userEmail = sessionStorage.getItem('userEmail');
    if (this.userEmail) {
      this.orderHistoryService.getOrderHistory(this.userEmail).subscribe({
        next: (data: IGetResponseOrderHistory) => {
          this.orderHistoryList = data._embedded.orders;
        },
        error: err => {
          console.log(err.message);
        },
      });
    }
  }
}
