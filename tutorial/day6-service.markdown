# Hướng dẫn sử dụng Service trong Angular để giao tiếp với Backend

## Cách thức Angular giao tiếp với Backend

Trong Angular, **Service** là một lớp được sử dụng để tách biệt logic nghiệp vụ khỏi component, giúp tái sử dụng code và quản lý dễ dàng hơn. Để giao tiếp với backend, Angular sử dụng **HttpClient** từ module `@angular/common/http` để thực hiện các yêu cầu HTTP (GET, POST, PUT, DELETE, v.v.). Service thường được sử dụng để đóng gói các yêu cầu HTTP và chia sẻ dữ liệu giữa các component.

### Các bước cơ bản:

1. **Tạo Service**: Sử dụng Angular CLI để tạo service.
2. **Sử dụng HttpClient**: Inject `HttpClient` vào service để thực hiện các yêu cầu HTTP.
3. **Kết nối Component**: Inject service vào component để sử dụng các phương thức gọi API.
4. **Quản lý lỗi**: Xử lý lỗi HTTP bằng `catchError` từ RxJS.

---

## Thực hiện kết nối với Backend thông qua HttpClient Service

### Cài đặt JSON Server

Để demo, chúng ta sẽ sử dụng **JSON Server** làm backend giả lập. Cài đặt JSON Server bằng lệnh:

```bash
npm install -g json-server
```

Tạo file `db.json` với nội dung:

```json
{
  "products": [
    { "id": 1, "name": "Laptop", "price": 1000, "inStock": true },
    { "id": 2, "name": "Phone", "price": 500, "inStock": false }
  ]
}
```

Chạy JSON Server:

```bash
json-server --watch db.json
```

JSON Server sẽ chạy tại `http://localhost:3000`.

---

## Tạo và sử dụng Service trong Angular

### Tạo Service

Sử dụng Angular CLI để tạo service:

```bash
ng generate service services/product
```

### Cấu hình App Config

Trong file `app.config.ts`, import `provideHttpClient()`:

```typescript
// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // Nếu muốn dùng Fetch API thay vì XMLHttpRequest:
    // withFetch()
  ],
};
```

---

## Service xử lý CRUD cho Product

### TypeScript (product.service.ts)

```typescript
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface Product {
  id?: number;
  name: string;
  price: number;
  inStock: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  // GET: Lấy danh sách sản phẩm
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET: Lấy sản phẩm theo ID
  getProduct(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST: Thêm sản phẩm
  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.apiUrl, product)
      .pipe(catchError(this.handleError));
  }

  // PUT: Cập nhật sản phẩm
  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/${product.id}`, product)
      .pipe(catchError(this.handleError));
  }

  // DELETE: Xóa sản phẩm
  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Xử lý lỗi HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

---

## Sử dụng Service trong Component

### TypeScript (product.ts)

```typescript
import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "./product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.html",
  styleUrls: ["./product.css"],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: "", price: 0, inStock: false };
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        this.newProduct = { name: "", price: 0, inStock: false };
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe({
      next: (updatedProduct) => {
        const index = this.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== id);
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }
}
```

### HTML (product.html)

```html
<div class="container">
  <h2>Product Management</h2>

  <!-- Form thêm sản phẩm -->
  <div class="form-group">
    <input
      type="text"
      [(ngModel)]="newProduct.name"
      placeholder="Product Name"
      class="form-control"
    />
    <input
      type="number"
      [(ngModel)]="newProduct.price"
      placeholder="Price"
      class="form-control"
    />
    <label
      ><input type="checkbox" [(ngModel)]="newProduct.inStock" /> In
      Stock</label
    >
    <button class="btn btn-primary" (click)="addProduct()">Add Product</button>
  </div>

  <!-- Hiển thị lỗi -->
  <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

  <!-- Danh sách sản phẩm -->
  <ul class="list-group">
    <li class="list-group-item" *ngFor="let product of products">
      {{ product.name }} - ${{ product.price }} - {{ product.inStock ? 'In
      Stock' : 'Out of Stock' }}
      <button
        class="btn btn-sm btn-warning"
        (click)="updateProduct({...product, inStock: !product.inStock})"
      >
        Toggle Stock
      </button>
      <button
        class="btn btn-sm btn-danger"
        (click)="deleteProduct(product.id!)"
      >
        Delete
      </button>
    </li>
  </ul>
</div>
```

### CSS (product.css)

```css
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
```

---

## Quản lý lỗi khi sử dụng Http Service

- Sử dụng `catchError` từ RxJS để xử lý lỗi HTTP.
- Hiển thị thông báo lỗi trong component bằng cách lưu trữ `errorMessage`.
- Có thể tùy chỉnh thông báo lỗi dựa trên mã trạng thái HTTP (ví dụ: 404, 500).

---

## Kết luận

- **Service** trong Angular giúp tách biệt logic giao tiếp với backend, tăng tính tái sử dụng và bảo trì.
- **HttpClient** cung cấp các phương thức mạnh mẽ để thực hiện các yêu cầu HTTP (GET, POST, PUT, DELETE).
- **Quản lý lỗi** là yếu tố quan trọng để đảm bảo trải nghiệm người dùng tốt khi làm việc với API.
- JSON Server là công cụ hữu ích để kiểm tra và phát triển nhanh ứng dụng Angular với backend giả lập.
