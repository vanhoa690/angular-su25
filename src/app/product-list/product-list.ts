import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: Product[] = [];

  filterText = '';

  constructor(private productService: ProductService) {}

  // useEffect
  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterProducts() {
    return this.products.filter((product) =>
      product.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
