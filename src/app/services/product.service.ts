import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProduct() {
    return this.http.get<Product[]>('http://localhost:3001/products');
  }
}
