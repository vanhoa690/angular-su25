import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  title = 'Product List';
  isAvailable = true;
  productName = 'Iphone';

  handleClick() {
    alert('Button clicked!');
  }
}
