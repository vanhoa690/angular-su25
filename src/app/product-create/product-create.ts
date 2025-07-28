import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      inStock: [false],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Form Submitted:', this.productForm.value);
      // Xử lý thêm sản phẩm tại đây
    }
  }
}
