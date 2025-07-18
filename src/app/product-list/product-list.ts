import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  title = 'Product List Page';
  isAvailable = true;
  productName = '';
  products = [
    { id: 1, name: 'Laptop', price: 1000, inStock: true },
    { id: 2, name: 'Phone', price: 500, inStock: false },
    { id: 3, name: 'Tablet', price: 300, inStock: true },
  ];
  handleClick() {
    alert('Button clicked!');
  }

  filterText = '';

  filterProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
