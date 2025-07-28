import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  imports: [ReactiveFormsModule],
  templateUrl: './product-update.html',
  styleUrl: './product-update.css',
})
export class ProductUpdate {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: '',
      image: '',
      price: 0,
    });
  }
}
