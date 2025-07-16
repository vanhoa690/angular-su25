import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ChildConponent } from './child-conponent/child-conponent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, ChildConponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-su25';
  stkChaGuiTien = '100000 trieu';
}
