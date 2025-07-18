import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: 'products',
    component: ProductList,
  },
  {
    path: 'products/:id',
    component: ProductDetail,
  },
  {
    path: 'categories',
    component: ProductList,
  },
  {
    path: 'users',
    component: ProductList,
  },
];
