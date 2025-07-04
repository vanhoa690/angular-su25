# Day 2: Hướng dẫn về Component, Data Binding và Directives trong Angular

## Mục tiêu

- Hiểu khái niệm Component và vai trò của nó trong Angular.
- Biết cách tạo và quản lý Component trong Angular.
- Thiết kế template cho Component.
- Thực hiện gắn kết dữ liệu (data binding) một cách hiệu quả.
- Sử dụng thành thạo các directive cơ bản như `ngFor`, `ngIf`.
- Tạo một demo cơ bản để minh họa các khái niệm.

## Yêu cầu

- Dự án Angular đã được tạo với Angular CLI và `pnpm` (xem `day1.md`).
- Kiến thức cơ bản về TypeScript và cấu trúc dự án Angular.

## 1. Component là gì?

**Component** là khối xây dựng cơ bản trong Angular, đại diện cho một phần giao diện người dùng (UI). Mỗi component bao gồm:

- **Template**: File HTML định nghĩa giao diện.
- **Class**: File TypeScript chứa logic và dữ liệu.
- **Styles**: File CSS/SCSS định dạng kiểu dáng.
- **Metadata**: Được định nghĩa bằng decorator `@Component`, chỉ định selector, template, và styles.

Ví dụ, component `app-root` là component mặc định trong dự án Angular, được khai báo trong `src/app/app.ts`.

## 2. Tạo và quản lý Component

### Tạo Component

Sử dụng Angular CLI để tạo component mới:

```bash
ng generate component product-list
```

Lệnh này tạo thư mục `src/app/product-list` với các file:

- `product-list.ts`: Class và logic của component.
- `product-list.html`: Template HTML.
- `product-list.css`: Style CSS.
- `product-list.spec.ts`: File test.

Nội dung file `product-list.ts`:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent {
  // Logic sẽ được thêm vào đây
}
```

### Quản lý Component

- **Standalone Component**: Angular 19 hỗ trợ standalone components, không cần khai báo trong module:

  ```ts
  import { Component } from "@angular/core";

  @Component({
    selector: "app-product-list",
    standalone: true,
    templateUrl: "./product-list.html",
    styleUrls: ["./product-list.css"],
  })
  export class ProductListComponent {}
  ```

  Sau đó, import trực tiếp vào `app.ts` hoặc `main.ts`.

### Sử dụng Component

Thêm component vào template của `app.html`:

```html
<app-product-list></app-product-list>
```

## 3. Thiết kế Template

Template là file HTML định nghĩa giao diện của component. Angular sử dụng cú pháp đặc biệt để gắn kết dữ liệu và sử dụng directive.

Ví dụ template `product-list.html`:

```html
<h2>Product List</h2>
<ul>
  <li>Sample Product</li>
</ul>
```

Template có thể được viết inline trong `@Component`:

```ts
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent {}
```

## 4. Gắn kết dữ liệu (Data Binding)

Data binding là cơ chế kết nối dữ liệu giữa TypeScript và template trong Angular. Có 4 loại chính:

- **Interpolation (`{{ }}`)**: Hiển thị dữ liệu từ component.
- **Property Binding (`[]`)**: Gắn giá trị vào thuộc tính HTML.
- **Event Binding (`()`)**: Xử lý sự kiện người dùng.
- **Two-way Binding (`[()]`)**: Đồng bộ dữ liệu hai chiều.

### Ví dụ Data Binding

Cập nhật `product-list.ts`:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent {
  title = "Product List";
  isAvailable = true;
  productName = "";

  handleClick() {
    alert("Button clicked!");
  }
}
```

Cập nhật `product-list.html`:

```html
<h2>{{ title }}</h2>
<div [ngClass]="{'available': isAvailable}">
  Status: {{ isAvailable ? 'Available' : 'Unavailable' }}
</div>
<input [(ngModel)]="productName" placeholder="Enter product name" />
<p>Product Name: {{ productName }}</p>
<button (click)="handleClick()">Click Me</button>
```

- **Interpolation**: `{{ title }}` hiển thị giá trị của biến `title`.
- **Property Binding**: `[ngClass]` gắn class động dựa trên `isAvailable`.
- **Event Binding**: `(click)` gọi hàm `handleClick` khi nhấn nút.
- **Two-way Binding**: `[(ngModel)]` đồng bộ giá trị input với `productName`.

Lưu ý: Để sử dụng `ngModel`, cần import `FormsModule` trong `product-list.ts`:

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-product-list",
  imports: [FormsModule],
  templateUrl: "./product-list.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent {
  title = "Product List";
  isAvailable = true;
  productName = "";

  handleClick() {
    alert("Button clicked!");
  }
}
```

## 5. Sử dụng các Directive cơ bản

Directive là cách mở rộng chức năng HTML trong Angular. Có hai loại chính:

- **Structural Directives**: Thay đổi cấu trúc DOM (`ngIf`, `ngFor`).
- **Attribute Directives**: Thay đổi thuộc tính hoặc hành vi (`ngClass`, `ngStyle`).

### `ngIf`

Hiển thị hoặc ẩn phần tử dựa trên điều kiện:

```html
<div *ngIf="isAvailable">This product is available!</div>
```

### `ngFor`

Lặp qua danh sách để render các phần tử:

```html
<ul>
  <li *ngFor="let product of products">{{ product.name }}</li>
</ul>
```

### Ví dụ kết hợp

Cập nhật `product-list.ts`:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent {
  products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 300 },
  ];
  isAvailable = true;
}
```

Cập nhật `product-list.html`:

```html
<h2>Product List</h2>
<div *ngIf="products.length > 0; else noProducts">
  <ul>
    <li *ngFor="let product of products">
      {{ product.name }} - ${{ product.price }}
      <span *ngIf="isAvailable" style="color: green;">(Available)</span>
    </li>
  </ul>
</div>
<ng-template #noProducts>
  <p>No products available.</p>
</ng-template>
```

## 6. Demo cơ bản: Danh sách sản phẩm

Tạo một component hiển thị danh sách sản phẩm với `ngFor`, `ngIf`, và data binding.

### Bước 1: Tạo Component

```bash
ng generate component product-list
```

### Bước 2: Cập nhật Component

File `product-list.ts`:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-product-list",
  standalone: true,
  templateUrl: "./product-list.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent {
  products = [
    { id: 1, name: "Laptop", price: 1000, inStock: true },
    { id: 2, name: "Phone", price: 500, inStock: false },
    { id: 3, name: "Tablet", price: 300, inStock: true },
  ];
  filterText = "";

  filterProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
```

File `product-list.html`:

```html
<h2>Product List</h2>
<input [(ngModel)]="filterText" placeholder="Filter by name" />
<div *ngIf="filterProducts().length > 0; else noProducts">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let product of filterProducts()">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>${{ product.price }}</td>
        <td [ngStyle]="{'color': product.inStock ? 'green' : 'red'}">
          {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
        </td>
      </tr>
    </tbody>
  </table>
</div>
<ng-template #noProducts>
  <p>No products match the filter.</p>
</ng-template>
```

File `product-list.css`:

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
input {
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
}
```

### Bước 3: Sử dụng Component

Cập nhật `app.html`:

```html
<h1>My Angular App</h1>
<app-product-list></app-product-list>
```

Nếu dùng standalone component, import `ProductListComponent` và `FormsModule` vào `app.ts`:

```ts
import { Component } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: "./app.html",
})
export class AppComponent {}
```

### Bước 4: Chạy ứng dụng

```bash
pnpm start
```

Truy cập `http://localhost:4200` để xem danh sách sản phẩm với tính năng lọc theo tên.

### Giải thích Demo

- **Component**: `ProductListComponent` hiển thị danh sách sản phẩm.
- **Data Binding**:
  - `[(ngModel)]` cho input để lọc sản phẩm.
  - Interpolation (`{{ product.name }}`) hiển thị dữ liệu.
  - `[ngStyle]` để thay đổi màu sắc dựa trên trạng thái `inStock`.
- **Directives**:
  - `*ngFor` để lặp qua danh sách sản phẩm.
  - `*ngIf` để kiểm tra danh sách có sản phẩm hay không.
- **Template**: Sử dụng bảng HTML để hiển thị dữ liệu rõ ràng.

## Tài nguyên bổ sung

- [Tài liệu Angular](https://angular.dev/)
- [Tài liệu TypeScript](https://www.typescriptlang.org/)
- [Angular CLI](https://angular.io/cli)
- [Tài liệu pnpm](https://pnpm.io/)

Chúc bạn học Angular hiệu quả!
