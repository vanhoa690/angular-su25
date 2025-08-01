import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  inStock: boolean;
};

export type ProductForm = Omit<Product, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProduct() {
    return this.http.get<Product[]>('http://localhost:3001/products');
  }

  createProduct(values: ProductForm) {
    return this.http.post('http://localhost:3001/products', values);
  }
}
