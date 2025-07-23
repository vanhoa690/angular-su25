import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  product = {
    name: '',
    image: '',
    price: 0,
    inStock: false,
  };

  constructor(private productService: ProductService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted:', this.product);
      this.productService.addProduct(this.product).subscribe({
        next: (products) => {
          console.log('Product added successfully:', products);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    }
  }
}
