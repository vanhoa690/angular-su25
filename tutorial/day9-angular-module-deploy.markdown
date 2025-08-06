# Hướng Dẫn Sử Dụng Angular Module, Lazy Loading, Debugging và Deploy trên Vercel

Trong Angular 19, **standalone components** được khuyến khích sử dụng để loại bỏ `NgModule`, giúp đơn giản hóa cấu trúc dự án. Hướng dẫn này tập trung vào việc sử dụng `app.routes` và `app.config`, triển khai Lazy Loading, debugging và deploy ứng dụng trên Vercel.

## 1. Cấu trúc Dự án với Standalone Components

### Tạo Dự án Angular 19

- Tạo dự án mới với Angular CLI:
  ```bash
  ng new my-app --standalone
  ```
- Lựa chọn này sẽ tạo dự án sử dụng standalone components thay vì `NgModule`.

### Sử dụng `app.config`

- File `app.config.ts` thay thế `AppModule` để cấu hình ứng dụng, bao gồm các provider như services, interceptors.
- Ví dụ `app.config.ts`:

  ```typescript
  import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
  import { provideRouter } from "@angular/router";
  import { provideHttpClient, withInterceptors } from "@angular/common/http";
  import { routes } from "./app.routes";
  import { authInterceptor } from "./core/interceptors/auth.interceptor";

  export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor])),
    ],
  };
  ```

- **Giải thích**:
  - `provideZoneChangeDetection`: Tối ưu hóa việc phát hiện thay đổi.
  - `provideRouter`: Cung cấp cấu hình routing từ `app.routes.ts`.
  - `provideHttpClient`: Cung cấp HTTP client với interceptor.

### Sử dụng `app.routes`

- File `app.routes.ts` định nghĩa các route của ứng dụng.
- Ví dụ `app.routes.ts`:

  ```typescript
  import { Routes } from "@angular/router";
  import { HomeComponent } from "./components/home/home.component";

  export const routes: Routes = [
    { path: "", component: HomeComponent },
    {
      path: "users",
      loadComponent: () =>
        import("./features/user/user-list.component").then(
          (c) => c.UserListComponent
        ),
    },
  ];
  ```

- **Lưu ý**:
  - `loadComponent` được sử dụng cho Lazy Loading (xem mục 3).

### Tạo Standalone Component

- Tạo component với tùy chọn standalone:
  ```bash
  ng generate component components/home
  ```
- Ví dụ `home.component.ts`:

  ```typescript
  import { Component } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import { RouterLink } from "@angular/router";

  @Component({
    selector: "app-home",
    imports: [CommonModule, RouterLink],
    template: `
      <h1>Welcome to Angular 19 Standalone</h1>
      <a routerLink="/users">Go to Users</a>
    `,
  })
  export class HomeComponent {}
  ```

### Shared Components, Directives, Pipes

- Tạo các shared components, directives, hoặc pipes:
  ```bash
  ng generate component shared/loading-spinner
  ng generate directive shared/highlight
  ng generate pipe shared/custom
  ```
- Ví dụ `loading-spinner.component.ts`:

  ```typescript
  import { Component } from "@angular/core";
  import { CommonModule } from "@angular/common";

  @Component({
    selector: "app-loading-spinner",
    imports: [CommonModule],
    template: `<div class="spinner">Loading...</div>`,
  })
  export class LoadingSpinnerComponent {}
  ```

- Sử dụng trong component khác bằng cách import vào mảng `imports`:

  ```typescript
  import { Component } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import { LoadingSpinnerComponent } from "../shared/loading-spinner.component";

  @Component({
    selector: "app-user-list",
    imports: [CommonModule, LoadingSpinnerComponent],
    template: `<app-loading-spinner></app-loading-spinner>`,
  })
  export class UserListComponent {}
  ```

## 2. Cài đặt Feature Component

Feature component là các component thực hiện một chức năng cụ thể (ví dụ: danh sách người dùng, sản phẩm).

- Tạo feature component:
  ```bash
  ng generate component features/user/user-list
  ```
- Ví dụ `user-list.component.ts`:

  ```typescript
  import { Component } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import { HttpClientModule } from "@angular/common/http";
  import { LoadingSpinnerComponent } from "../../shared/loading-spinner.component";

  @Component({
    selector: "app-user-list",
    imports: [CommonModule, HttpClientModule, LoadingSpinnerComponent],
    template: `
      <app-loading-spinner *ngIf="loading"></app-loading-spinner>
      <ul>
        <li *ngFor="let user of users">{{ user.name }}</li>
      </ul>
    `,
  })
  export class UserListComponent {
    users: any[] = [];
    loading = true;

    constructor() {
      // Giả lập dữ liệu
      setTimeout(() => {
        this.users = [{ name: "User 1" }, { name: "User 2" }];
        this.loading = false;
      }, 1000);
    }
  }
  ```

## 3. Hiểu và Cài đặt Lazy Loading

Lazy Loading trong Angular 19 với components sử dụng `loadComponent` trong `app.routes.ts`.

- **Cấu hình Lazy Loading**:

  - Trong `app.routes.ts`:

    ```typescript
    import { Routes } from "@angular/router";

    export const routes: Routes = [
      { path: "", component: HomeComponent },
      {
        path: "users",
        loadComponent: () =>
          import("./features/user/user-list.component").then(
            (c) => c.UserListComponent
          ),
      },
    ];
    ```

- **Lợi ích**:
  - Chỉ tải component khi route được truy cập, giảm thời gian tải ban đầu.
- **Lưu ý**:
  - Đảm bảo component được load là standalone và không được import trực tiếp trong `app.component` hoặc các component khác.

## 4. Debugging Ứng dụng Angular

- **Sử dụng Angular DevTools**:
  - Cài đặt tiện ích Angular DevTools trên Chrome hoặc Firefox.
  - Kiểm tra cấu trúc component, trạng thái, và hiệu suất ứng dụng.
- **Debugging với Console**:
  - Sử dụng `console.log` hoặc `debugger`:
    ```typescript
    @Component({
      selector: "app-user-list",
      imports: [CommonModule],
      template: `<ul>
        <li *ngFor="let user of users">{{ user.name }}</li>
      </ul>`,
    })
    export class UserListComponent {
      users: any[] = [];
      ngOnInit() {
        console.log("Users:", this.users);
        debugger; // Dừng để kiểm tra trong DevTools
      }
    }
    ```
- **Source Map**:
  - Khi build, bật source map:
    ```bash
    ng build --source-map
    ```
  - Giúp theo dõi lỗi trong mã nguồn gốc.
- **Kiểm tra lỗi với `ng serve`**:
  - Chạy `ng serve` để xem lỗi biên dịch hoặc runtime trong console.

## 5. Deploy Ứng dụng Angular trên Vercel

### Chuẩn bị ứng dụng

- **Build ứng dụng**:
  ```bash
  ng build --prod
  ```
  - Thư mục `dist` sẽ chứa các file build (thường là `dist/my-app`).

### Cài đặt Vercel CLI

- Cài đặt Vercel CLI:
  ```bash
  npm install -g vercel
  ```

### Deploy lên Vercel

1. **Đăng nhập vào Vercel**:
   ```bash
   vercel login
   ```
2. **Deploy ứng dụng**:
   - Từ thư mục gốc của dự án, chạy:
     ```bash
     vercel
     ```
   - Vercel sẽ hỏi:
     - Thư mục build (mặc định: `dist/my-app`).
     - Có override thiết lập không (thường chọn `No`).
3. **Cấu hình Vercel**:
   - Tạo file `vercel.json` trong thư mục gốc:
     ```json
     {
       "version": 2,
       "builds": [
         {
           "src": "dist/my-app/**",
           "use": "@vercel/static"
         }
       ],
       "routes": [
         {
           "src": "/(.*)",
           "dest": "dist/my-app/index.html"
         }
       ]
     }
     ```
   - Thay `my-app` bằng tên dự án của bạn (xem trong `angular.json`).
4. **Deploy lại**:
   ```bash
   vercel --prod
   ```

### Kiểm tra ứng dụng

- Vercel cung cấp URL (ví dụ: `https://my-app.vercel.app`).
- Truy cập URL để kiểm tra ứng dụng.

## Lưu ý

- **Standalone Components**: Loại bỏ `NgModule`, sử dụng `imports` trong component để quản lý phụ thuộc.
- **app.config**: Cấu hình toàn bộ ứng dụng (services, interceptors).
- **app.routes**: Định nghĩa routing, hỗ trợ Lazy Loading với `loadComponent`.
- **Debugging**: Sử dụng Angular DevTools và source map để phát hiện lỗi.
- **Vercel**: Đảm bảo cấu hình đúng thư mục build trong `vercel.json`.
