import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { CategoryList } from './category-list/category-list';

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
    path: 'categories',
    component: CategoryList,
  },
  //   {
  //   path: 'brands',
  //   component: BrandList,
  // },
  //   {
  //   path: 'users',
  //   component: UserList,
  // },
  {
    path: 'products/:id',
    component: ProductDetail,
  },
];
