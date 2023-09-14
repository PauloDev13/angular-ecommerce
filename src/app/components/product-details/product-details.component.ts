import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly productService: ProductService = inject(ProductService);

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    const productId = +this.route.snapshot.params['id'];
    if (productId) {
      this.productService.getProductDetails(productId).subscribe({
        next: (data: Product) => {
          console.log('DATA', JSON.stringify(data));
          this.product = data;
        },
      });
    }
  }
}
