import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { CategoryList } from './category-list/category-list';
import { ProductCreate } from './product-create/product-create';
import { BrandCreate } from './brand-create/brand-create';
import { CategoryCreate } from './category-create/category-create';
import { ProductUpdate } from './product-update/product-update';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
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
    path: 'product/:id/detail',
    component: ProductDetail,
    canActivate: [], // Add guards if needed
  },
  {
    path: 'products/create',
    component: ProductCreate,
  },
  {
    path: 'products/update/:id',
    component: ProductUpdate,
  },
  {
    path: 'brands/create',
    component: BrandCreate,
  },
  {
    path: 'categories/create',
    component: CategoryCreate,
  },
];
