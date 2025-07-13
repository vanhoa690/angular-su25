# Hướng dẫn tìm hiểu và thực hành Routing trong Angular

## 1. Routing là gì? Sự cần thiết của nó

Routing trong Angular là cơ chế cho phép điều hướng giữa các view hoặc component mà không cần tải lại toàn bộ trang web. Nó giúp tạo ra các ứng dụng Single Page Application (SPA) với trải nghiệm người dùng mượt mà.

**Sự cần thiết của Routing:**

- **Điều hướng dễ dàng**: Cho phép người dùng chuyển đổi giữa các trang (ví dụ: Trang chủ, Sản phẩm, Liên hệ) mà không cần tải lại trang.
- **Tổ chức mã tốt hơn**: Tách biệt các chức năng thành các component riêng biệt.
- **Hỗ trợ truyền tham số**: Dễ dàng truyền dữ liệu qua URL (ví dụ: ID sản phẩm).
- **Bảo mật**: Kiểm soát quyền truy cập vào các route thông qua các guard như `canActivate`.
- **SEO và chia sẻ liên kết**: Cho phép tạo URL rõ ràng, hỗ trợ bookmark và chia sẻ.

---

## 2. Cài đặt Routing

Angular 19 sử dụng `app.config.ts` để cấu hình ứng dụng. Dưới đây là các bước để cài đặt routing

### Bước 1: Định nghĩa Routes

Tạo file `app.routes.ts` để định nghĩa các route:

```typescript
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home";
import { ProductComponent } from "./product/product";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "product", component: ProductComponent },
];
```

### Bước 2: Cấu hình ApplicationConfig

Trong file `app.config.ts`, sử dụng `provideRouter` để cung cấp cấu hình routing:

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideZoneChangeDetection } from "@angular/core";
import { provideBrowserGlobalErrorListeners } from "@angular/platform-browser";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
```

### Bước 3: Cấu hình main.ts

Trong file `main.ts`, sử dụng `bootstrapApplication` để khởi động ứng dụng với `appConfig`:

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
```

### Bước 4: Thêm Router Outlet

Trong template của `AppComponent` (`app.html`), thêm thẻ `<router-outlet>` để hiển thị nội dung của các component dựa trên route:

```typescript
@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {}
```

```html
<router-outlet></router-outlet>
```

### Bước 5: Thêm liên kết điều hướng

Sử dụng directive `routerLink` để tạo các liên kết điều hướng trong template:

```html
<a routerLink="/">Trang chủ</a> <a routerLink="/product">Sản phẩm</a>
```

---

## 3. Định dạng Router

Angular hỗ trợ nhiều cách định dạng route để phù hợp với các trường hợp sử dụng:

### Route cơ bản

```typescript
{ path: 'home', component: HomeComponent }
```

### Route mặc định

```typescript
{ path: '', redirectTo: '/home', pathMatch: 'full' }
```

### Route với tham số

```typescript
{ path: 'product/:id', component: ProductDetailComponent }
```

### Route con (Child Routes)

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'settings', component: SettingsComponent }
  ]
}
```

### Lazy Loading

Tải module theo nhu cầu để tối ưu hiệu suất:

```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.ts').then(m => m.AdminModule)
}
```

---

## 4. Xử lý tham số trong Routing

### Truyền tham số

Tham số được truyền qua URL, ví dụ: `/product/123`. Định nghĩa route với tham số:

```typescript
{ path: 'product/:id', component: ProductDetail}
```

### Nhận tham số

Trong component, sử dụng `ActivatedRoute` để lấy tham số. Template được tách ra file HTML riêng biệt.

**TypeScript (`product-detail.ts`)**:

```typescript
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.html",
})
export class ProductDetailComponent implements OnInit {
  productId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get("id");
    });
  }
}
```

**HTML (`product-detail.html`)**:

```html
<h2>Product ID: {{ productId }}</h2>
```

### Query Parameters

Truyền query parameters qua URL, ví dụ: `/product?id=123&name=phone`.
Lấy query parameters:

```typescript
this.route.queryParamMap.subscribe((params) => {
  const id = params.get("id");
  const name = params.get("name");
});
```

---

## 5. Bảo vệ Route với canActivate

`canActivate` là một **Route Guard** dùng để kiểm soát quyền truy cập vào một route. Ví dụ, chỉ cho phép người dùng đã đăng nhập truy cập vào route `/dashboard`.

### Bước 1: Tạo Auth Service

Tạo service để kiểm tra trạng thái đăng nhập:

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn(): boolean {
    // Logic kiểm tra đăng nhập (ví dụ: kiểm tra token)
    return !!localStorage.getItem("token");
  }
}
```

### Bước 2: Tạo CanActivate Guard

Tạo guard để bảo vệ route:

```typescript
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
```

### Bước 3: Áp dụng Guard vào Route

Trong `app.routes.ts`, thêm `canActivate` vào route:

```typescript
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home";
import { ProductComponent } from "./product/product";
import { DashboardComponent } from "./dashboard/dashboard";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "product", component: ProductComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
```

### Bước 4: Cung cấp Guard trong app.config.ts

Trong `app.config.ts`, thêm `AuthGuard` vào `providers`:

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideZoneChangeDetection } from "@angular/core";
import { provideBrowserGlobalErrorListeners } from "@angular/platform-browser";
import { routes } from "./app.routes";
import { AuthGuard } from "./auth.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthGuard,
  ],
};
```

---

## Kết luận

Routing trong Angular 19 được cấu hình dễ dàng thông qua `app.config.ts` và `provideRouter`, loại bỏ sự phụ thuộc vào `AppModule` và `AppRoutingModule`. Sử dụng `routes` và tách template vào file HTML riêng biệt giúp mã dễ đọc và bảo trì. Hãy thực hành các ví dụ trên để nắm vững cách triển khai routing trong dự án Angular của bạn.
