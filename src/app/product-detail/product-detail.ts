import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = {
    id: 1,
    name: 'Laptop',
    price: 1000,
    image:
      'https://fdn.gsmarena.com/imgroot/reviews/24/apple-iphone-16/lifestyle/-1024w2/gsmarena_001.jpg',
    inStock: true,
  };
}
