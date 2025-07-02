import { Component } from '@angular/core';
import { HelloWorld } from './hello-world/hello-world';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [HelloWorld, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-su25';
}
