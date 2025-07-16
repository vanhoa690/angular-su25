import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { CategoryList } from './category-list/category-list';
import { ProductDetail } from './product-detail/product-detail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, CategoryList, ProductDetail],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-su25';
  stkChaGuiTien = '100000 trieu';
}
