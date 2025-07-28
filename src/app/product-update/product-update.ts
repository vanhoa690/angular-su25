import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-update.html',
  styleUrl: './product-update.css',
})
export class ProductUpdate {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(3)]],
    });
  }

  handleSubmit() {
    console.log(this.productForm); //invalid (valid), value
  }
}
