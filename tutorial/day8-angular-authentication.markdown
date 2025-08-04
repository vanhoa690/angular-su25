# Hướng dẫn Authentication trong Angular 19 (Standalone) với json-server-auth và Bootstrap 5

## 1. Hiểu về Authentication trong Angular

Authentication (xác thực) trong Angular là quá trình xác minh danh tính người dùng, đảm bảo chỉ những người dùng được phép mới truy cập vào các tài nguyên hoặc tính năng nhất định. Authentication thường bao gồm:

- **Đăng ký (Signup)**: Tạo tài khoản mới với email và mật khẩu.
- **Đăng nhập (Login)**: Xác thực thông tin đăng nhập để cấp quyền truy cập, thường sử dụng token JWT.
- **Đăng xuất (Logout)**: Kết thúc phiên làm việc, xóa token hoặc thông tin xác thực.
- **Bảo vệ Route**: Hạn chế truy cập vào các route chỉ dành cho người dùng đã đăng nhập bằng `canActivate`.

Trong hướng dẫn này, chúng ta sử dụng **Angular 19** với **Standalone Components**, **json-server-auth** cho API giả lập, và **Bootstrap 5** cho giao diện, thay vì Angular Material. Chúng ta sẽ loại bỏ các file module (`.module.ts`) và chuyển sang cấu trúc standalone.

---

## 2. Authentication hoạt động như thế nào

Authentication trong Angular bao gồm các bước:

1. **Gửi yêu cầu xác thực**: Gửi thông tin đăng nhập (email/mật khẩu) đến server qua API (`POST /login`).
2. **Nhận và lưu trữ token**: Server trả về token JWT, lưu trong `localStorage`.
3. **Sử dụng token**: Gửi token trong header `Authorization` của các yêu cầu API để truy cập tài nguyên bảo mật.
4. **Bảo vệ route**: Sử dụng `canActivate` để kiểm tra trạng thái đăng nhập trước khi truy cập route.
5. **Xử lý lỗi**: Hiển thị thông báo lỗi khi đăng nhập thất bại (ví dụ: sai mật khẩu).
6. **Đăng xuất tự động**: Xóa token khi hết hạn hoặc khi người dùng đăng xuất.

---

## 3. Cài đặt và sử dụng json-server-auth

### Bước 1: Cài đặt json-server và json-server-auth

Chạy lệnh:

```bash
pnpm install json-server@0.17.0 json-server-auth
```

### Bước 2: Tạo file `db.json`

Tạo file `db.json` trong thư mục dự án:

```json
{
  "users": []
}
```

### Bước 3: Chạy json-server với json-server-auth

Chạy server:

```bash
json-server -m json-server-auth db.json
```

Server chạy trên `http://localhost:3000` với các endpoint:

- `POST /register`: Đăng ký người dùng mới.
- `POST /login`: Đăng nhập và nhận token JWT.
- `GET /users/me`: Lấy thông tin người dùng hiện tại (yêu cầu token).

---

## 4. Cài đặt dự án Angular

### Bước 1: Tạo dự án Angular

Tạo dự án Angular 19 với cấu hình standalone:

```bash
ng new angular-auth-example --style=scss --standalone
cd angular-auth-example
```

### Bước 2: Cài đặt Bootstrap 5 và các thư viện

Cài đặt Bootstrap 5 và Axios:

```bash
npm install bootstrap@5 axios
```

Thêm Bootstrap vào `angular.json` trong phần `"styles"`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
```

Thêm script Bootstrap vào `angular.json` trong phần `"scripts"`:

```json
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

### Bước 3: Cấu trúc dự án

Tạo cấu trúc thư mục:

```
src/app/
  ├── auth/
  │   ├── auth.service.ts
  │   ├── auth.guard.ts
  │   ├── login/
  │   │   ├── login.ts
  │   │   ├── login.html
  │   │   ├── login.scss
  │   ├── signup/
  │   │   ├── signup.ts
  │   │   ├── signup.html
  │   │   ├── signup.scss
  ├── pages/
  │   ├── home/
  │   │   ├── home.ts
  │   │   ├── home.html
  │   │   ├── home.scss
  │   ├── dashboard/
  │   │   ├── dashboard.ts
  │   │   ├── dashboard.html
  │   │   ├── dashboard.scss
  │   ├── access-denied/
  │   │   ├── access-denied.ts
  │   │   ├── access-denied.html
  │   │   ├── access-denied.scss
  ├── app.ts
  ├── app.html
  ├── app.scss
  ├── app.routes.ts
  ├── main.ts
```

Tạo các file:

```bash
ng g s auth/auth
ng g guard auth/auth --functional
ng g c auth/login --standalone
ng g c auth/signup --standalone
ng g c pages/home --standalone
ng g c pages/dashboard --standalone
ng g c pages/access-denied --standalone
```

---

## 5. Code ứng dụng

### Bước 1: Cấu hình Main

Cập nhật `src/main.ts`:

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./app/app";
import { routes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
```

### Bước 2: Cấu hình Routes

Cập nhật `src/app/app.routes.ts`:

```typescript
import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login";
import { SignupComponent } from "./auth/signup/signup";
import { HomeComponent } from "./pages/home/home";
import { DashboardComponent } from "./pages/dashboard/dashboard";
import { AccessDeniedComponent } from "./pages/access-denied/access-denied";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: "access-denied", component: AccessDeniedComponent },
  { path: "**", redirectTo: "" },
];
```

### Bước 3: Auth Service

Cập nhật `src/app/auth/auth.service.ts`:

```typescript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

interface AuthResponse {
  accessToken: string;
  user: { email: string };
}

interface User {
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem("token", response.accessToken);
        }),
        catchError((error) => {
          return throwError(
            () => new Error(error.error.message || "Đăng ký thất bại")
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem("token", response.accessToken);
        }),
        catchError((error) => {
          return throwError(
            () => new Error(error.error.message || "Đăng nhập thất bại")
          );
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem("token");
    if (!token) {
      return throwError(() => new Error("Không có token"));
    }
    return this.http
      .get<User>(`${this.apiUrl}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        catchError((error) => {
          localStorage.removeItem("token");
          return throwError(() => new Error("Phiên đăng nhập không hợp lệ"));
        })
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}
```

### Bước 4: Auth Guard

Cập nhật `src/app/auth/auth.guard.ts`:

```typescript
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(["/access-denied"]);
  return false;
};
```

### Bước 5: Component Đăng nhập

Cập nhật `src/app/auth/login/login.ts`:

```typescript
import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.html",
  styleUrls: ["./login.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }
}
```

Cập nhật `src/app/auth/login/login.html`:

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card mt-5">
        <div class="card-header">
          <h3>Đăng nhập</h3>
        </div>
        <div class="card-body">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                formControlName="email"
                [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
              />
              <div
                *ngIf="loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched"
                class="invalid-feedback"
              >
                Vui lòng nhập email
              </div>
              <div
                *ngIf="loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched"
                class="invalid-feedback"
              >
                Email không hợp lệ
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input
                type="password"
                class="form-control"
                id="password"
                formControlName="password"
                [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              />
              <div
                *ngIf="loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched"
                class="invalid-feedback"
              >
                Vui lòng nhập mật khẩu
              </div>
              <div
                *ngIf="loginForm.get('password')?.hasError('minlength') && loginForm.get('password')?.touched"
                class="invalid-feedback"
              >
                Mật khẩu phải có ít nhất 6 ký tự
              </div>
            </div>
            <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              [disabled]="loginForm.invalid"
            >
              Đăng nhập
            </button>
          </form>
          <div class="text-center mt-3">
            Chưa có tài khoản? <a routerLink="/signup">Đăng ký</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Cập nhật `src/app/auth/login/login.scss`:

```scss
.container {
  margin-top: 50px;
}
```

### Bước 6: Component Đăng ký

Cập nhật `src/app/auth/signup/signup.ts`:

```typescript
import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./signup.html",
  styleUrls: ["./signup.scss"],
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, password } = this.signupForm.value;
    this.authService.signup(email, password).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }
}
```

Cập nhật `src/app/auth/signup/signup.html`:

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card mt-5">
        <div class="card-header">
          <h3>Đăng ký</h3>
        </div>
        <div class="card-body">
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                formControlName="email"
                [class.is-invalid]="signupForm.get('email')?.invalid && signupForm.get('email')?.touched"
              />
              <div
                *ngIf="signupForm.get('email')?.hasError('required') && signupForm.get('email')?.touched"
                class="invalid-feedback"
              >
                Vui lòng nhập email
              </div>
              <div
                *ngIf="signupForm.get('email')?.hasError('email') && signupForm.get('email')?.touched"
                class="invalid-feedback"
              >
                Email không hợp lệ
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input
                type="password"
                class="form-control"
                id="password"
                formControlName="password"
                [class.is-invalid]="signupForm.get('password')?.invalid && signupForm.get('password')?.touched"
              />
              <div
                *ngIf="signupForm.get('password')?.hasError('required') && signupForm.get('password')?.touched"
                class="invalid-feedback"
              >
                Vui lòng nhập mật khẩu
              </div>
              <div
                *ngIf="signupForm.get('password')?.hasError('minlength') && signupForm.get('password')?.touched"
                class="invalid-feedback"
              >
                Mật khẩu phải có ít nhất 6 ký tự
              </div>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label"
                >Xác nhận mật khẩu</label
              >
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                formControlName="confirmPassword"
                [class.is-invalid]="signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched || signupForm.errors?.['mismatch']"
              />
              <div
                *ngIf="signupForm.get('confirmPassword')?.hasError('required') && signupForm.get('confirmPassword')?.touched"
                class="invalid-feedback"
              >
                Vui lòng xác nhận mật khẩu
              </div>
              <div
                *ngIf="signupForm.errors?.['mismatch']"
                class="invalid-feedback"
              >
                Mật khẩu xác nhận không khớp
              </div>
            </div>
            <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              [disabled]="signupForm.invalid"
            >
              Đăng ký
            </button>
          </form>
          <div class="text-center mt-3">
            Đã có tài khoản? <a routerLink="/login">Đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Cập nhật `src/app/auth/signup/signup.scss`:

```scss
.container {
  margin-top: 50px;
}
```

### Bước 7: Component Trang chủ

Cập nhật `src/app/pages/home/home.ts`:

```typescript
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
})
export class HomeComponent {}
```

Cập nhật `src/app/pages/home/home.html`:

```html
<div class="container text-center mt-5">
  <h1>Chào mừng đến với ứng dụng</h1>
  <a routerLink="/dashboard" class="btn btn-primary">Vào Dashboard</a>
</div>
```

Cập nhật `src/app/pages/home/home.scss`:

```scss
.container {
  margin-top: 50px;
}
```

### Bước 8: Component Dashboard

Cập nhật `src/app/pages/dashboard/dashboard.ts`:

```typescript
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.html",
  styleUrls: ["./dashboard.scss"],
})
export class DashboardComponent implements OnInit {
  user: { email: string } | null = null;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: () => {
        this.error = "Phiên đăng nhập không hợp lệ";
        this.router.navigate(["/login"]);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
```

Cập nhật `src/app/pages/dashboard/dashboard.html`:

```html
<div class="container text-center mt-5">
  <h1>Dashboard</h1>
  <p *ngIf="user">Xin chào, {{ user.email }}</p>
  <p *ngIf="error" class="alert alert-danger">{{ error }}</p>
  <button class="btn btn-primary" (click)="logout()">Đăng xuất</button>
</div>
```

Cập nhật `src/app/pages/dashboard/dashboard.scss`:

```scss
.container {
  margin-top: 50px;
}
```

### Bước 9: Component Access Denied

Cập nhật `src/app/pages/access-denied/access-denied.ts`:

```typescript
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-access-denied",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./access-denied.html",
  styleUrls: ["./access-denied.scss"],
})
export class AccessDeniedComponent {}
```

Cập nhật `src/app/pages/access-denied/access-denied.html`:

```html
<div class="container text-center mt-5">
  <div class="card">
    <div class="card-body">
      <h3>403 - Từ chối truy cập</h3>
      <p>Bạn không có quyền truy cập trang này.</p>
      <a routerLink="/" class="btn btn-primary">Về trang chủ</a>
    </div>
  </div>
</div>
```

Cập nhật `src/app/pages/access-denied/access-denied.scss`:

```scss
.container {
  margin-top: 50px;
}
.card {
  max-width: 400px;
  margin: 0 auto;
}
```

### Bước 10: Cập nhật App Component

Cập nhật `src/app/app.ts`:

```typescript
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./app.html",
  styleUrls: ["./app.scss"],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
```

Cập nhật `src/app/app.html`:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Angular Auth</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/">Home</a>
        </li>
        <li class="nav-item" *ngIf="!isAuthenticated()">
          <a class="nav-link" routerLink="/login">Đăng nhập</a>
        </li>
        <li class="nav-item" *ngIf="!isAuthenticated()">
          <a class="nav-link" routerLink="/signup">Đăng ký</a>
        </li>
        <li class="nav-item" *ngIf="isAuthenticated()">
          <button class="nav-link btn btn-link" (click)="logout()">
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
<router-outlet></router-outlet>
```

Cập nhật `src/app/app.scss`:

```scss
.navbar {
  margin-bottom: 20px;
}
```

---

## 6. Lưu trữ thông tin đăng nhập và sử dụng token

- **Lưu trữ token**: Token JWT được lưu trong `localStorage` sau khi đăng nhập/đăng ký thành công.
- **Sử dụng token**: Token được gửi trong header `Authorization: Bearer <token>` khi gọi API `/users/me`.
- **Đăng xuất tự động**: Nếu token không hợp lệ, `AuthService` xóa token và chuyển hướng đến trang đăng nhập.

---

## 7. Bảo vệ Route với canActivate

- **authGuard**: Kiểm tra trạng thái đăng nhập bằng `AuthService.isAuthenticated()`. Nếu chưa đăng nhập, người dùng được chuyển hướng đến `/access-denied`.
- Route `/dashboard` được bảo vệ bởi `authGuard` trong `app.routes.ts`.

---

## 8. Xử lý lỗi đăng nhập

- Lỗi từ server (sai mật khẩu, email đã tồn tại) được xử lý trong `AuthService` và hiển thị trong form.
- Form sử dụng `ReactiveFormsModule` với các validator:
  - Email: Bắt buộc, định dạng email hợp lệ.
  - Mật khẩu: Bắt buộc, tối thiểu 6 ký tự.
  - Xác nhận mật khẩu (signup): Phải khớp với mật khẩu.

---

## 9. Chạy ứng dụng

### Bước 1: Chạy JSON Server

```bash
json-server -m json-server-auth db.json
```

### Bước 2: Chạy ứng dụng Angular

```bash
ng serve
```

Ứng dụng chạy trên `http://localhost:4200`.

---

## 10. Kết luận

Hướng dẫn này đã trình bày cách xây dựng hệ thống xác thực trong Angular 19 với **Standalone Components**, `json-server-auth`, và **Bootstrap 5**:

- **Đăng ký/Đăng nhập**: Form với validate đầy đủ (email, mật khẩu, xác nhận mật khẩu).
- **Lưu trữ và sử dụng token**: Token JWT lưu trong `localStorage` và gửi trong header API.
- **Bảo vệ Route**: Sử dụng `canActivate` guard để hạn chế truy cập `/dashboard`.
- **Xử lý lỗi**: Hiển thị thông báo lỗi từ server hoặc validate form.
- **Đăng xuất tự động**: Xóa token khi phiên không hợp lệ.
- **UI**: Sử dụng Bootstrap 5 thay vì Angular Material, loại bỏ file module.

Để mở rộng, bạn có thể:

- Thêm phân quyền dựa trên vai trò (admin, user).
- Tích hợp backend thực tế.
- Thêm HTTP Interceptor để tự động làm mới token.
