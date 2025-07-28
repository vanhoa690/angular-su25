# Hướng dẫn sử dụng Form trong Angular

## Form là gì? Angular hỗ trợ như thế nào?

**Form** là một thành phần giao diện người dùng cho phép thu thập và xử lý dữ liệu từ người dùng. Trong Angular, form được hỗ trợ thông qua hai cách tiếp cận chính:

1. **Template-driven Forms**: Dựa trên các directive trong template, phù hợp cho các form đơn giản, dễ thiết lập.
2. **Reactive Forms**: Dựa trên lập trình phản ứng (reactive programming), cung cấp khả năng kiểm soát mạnh mẽ, dễ test và phù hợp với các form phức tạp.

Angular cung cấp các module như `FormsModule` (cho Template-driven) và `ReactiveFormsModule` (cho Reactive) để hỗ trợ xây dựng và quản lý form, cùng với các công cụ validation mạnh mẽ.

---

## Xây dựng Form dạng Template-driven

Template-driven Forms sử dụng các directive như `ngModel` để liên kết dữ liệu hai chiều (two-way data binding) và quản lý form trong template HTML.

### Ví dụ: Form thêm sản phẩm (Template-driven)

#### HTML (form-template.html)

```html
<form #productForm="ngForm" (ngSubmit)="onSubmit(productForm)">
  <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      [(ngModel)]="product.name"
      required
      minlength="3"
      #name="ngModel"
      class="form-control"
      [ngClass]="{'is-invalid': name.invalid && name.touched}"
    />
    <div *ngIf="name.invalid && name.touched" class="invalid-feedback">
      <div *ngIf="name.errors?.['required']">Name is required.</div>
      <div *ngIf="name.errors?.['minlength']">
        Name must be at least 3 characters long.
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="image">Image URL</label>
    <input
      type="url"
      id="image"
      name="image"
      [(ngModel)]="product.image"
      required
      #image="ngModel"
      class="form-control"
      [ngClass]="{'is-invalid': image.invalid && image.touched}"
    />
    <div *ngIf="image.invalid && image.touched" class="invalid-feedback">
      Image URL is required.
    </div>
  </div>

  <div class="form-group">
    <label for="price">Price</label>
    <input
      type="number"
      id="price"
      name="price"
      [(ngModel)]="product.price"
      required
      min="0"
      #price="ngModel"
      class="form-control"
      [ngClass]="{'is-invalid': price.invalid && price.touched}"
    />
    <div *ngIf="price.invalid && price.touched" class="invalid-feedback">
      <div *ngIf="price.errors?.['required']">Price is required.</div>
      <div *ngIf="price.errors?.['min']">Price must be non-negative.</div>
    </div>
  </div>

  <div class="form-group">
    <label for="inStock">In Stock</label>
    <input
      type="checkbox"
      id="inStock"
      name="inStock"
      [(ngModel)]="product.inStock"
      class="form-check-input"
    />
  </div>

  <button
    type="submit"
    class="btn btn-primary"
    [disabled]="productForm.invalid"
  >
    Add Product
  </button>
</form>
```

#### CSS (form-template.css)

```css
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.form-check-input {
  margin-right: 0.5rem;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
}

.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}
```

#### TypeScript (form-template.ts)

```typescript
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [BrowserModule, FormsModule],
})
export class AppModule {}

export class ProductFormComponent {
  product = {
    name: "",
    image: "",
    price: 0,
    inStock: false,
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log("Form Submitted:", this.product);
      // Xử lý thêm sản phẩm tại đây
    }
  }
}
```

---

## Xây dựng Form dạng Reactive

Reactive Forms sử dụng `FormBuilder` để tạo form một cách programmatic, cung cấp khả năng kiểm soát tốt hơn và dễ dàng xử lý các form phức tạp.

### Ví dụ: Form thêm sản phẩm (ProductCreate)

#### TypeScript (product-create.ts)

```typescript
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-product-create",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./product-create.html",
  styleUrl: "./product-create.css",
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      image: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      inStock: [false],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log("Form Submitted:", this.productForm.value);
      // Xử lý thêm sản phẩm tại đây
    }
  }
}
```

#### HTML (product-create.html)

```html
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      formControlName="name"
      class="form-control"
      [ngClass]="{'is-invalid': productForm.get('name')?.invalid && productForm.get('name')?.touched}"
    />
    <div
      *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched"
      class="invalid-feedback"
    >
      <div *ngIf="productForm.get('name')?.errors?.['required']">
        Name is required.
      </div>
      <div *ngIf="productForm.get('name')?.errors?.['minlength']">
        Name must be at least 3 characters long.
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="image">Image URL</label>
    <input
      type="url"
      id="image"
      formControlName="image"
      class="form-control"
      [ngClass]="{'is-invalid': productForm.get('image')?.invalid && productForm.get('image')?.touched}"
    />
    <div
      *ngIf="productForm.get('image')?.invalid && productForm.get('image')?.touched"
      class="invalid-feedback"
    >
      Image URL is required.
    </div>
  </div>

  <div class="form-group">
    <label for="price">Price</label>
    <input
      type="number"
      id="price"
      formControlName="price"
      class="form-control"
      [ngClass]="{'is-invalid': productForm.get('price')?.invalid && productForm.get('price')?.touched}"
    />
    <div
      *ngIf="productForm.get('price')?.invalid && productForm.get('price')?.touched"
      class="invalid-feedback"
    >
      <div *ngIf="productForm.get('price')?.errors?.['required']">
        Price is required.
      </div>
      <div *ngIf="productForm.get('price')?.errors?.['min']">
        Price must be non-negative.
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="inStock">In Stock</label>
    <input
      type="checkbox"
      id="inStock"
      formControlName="inStock"
      class="form-check-input"
    />
  </div>

  <button
    type="submit"
    class="btn btn-primary"
    [disabled]="productForm.invalid"
  >
    Add Product
  </button>
</form>
```

#### CSS (product-create.css)

```css
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.form-check-input {
  margin-right: 0.5rem;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
}

.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}
```

---

## Xử lý Validation trên Form

### Validation trong Template-driven Forms

- Sử dụng các directive như `required`, `minlength`, `min` để thêm quy tắc validation.
- Kiểm tra trạng thái của form hoặc control bằng các thuộc tính như `invalid`, `touched`.
- Hiển thị thông báo lỗi bằng `*ngIf` kết hợp với `errors` object.

### Validation trong Reactive Forms

- Sử dụng `Validators` từ `@angular/forms` để định nghĩa các quy tắc validation trong `FormBuilder`.
- Kiểm tra trạng thái của form hoặc control bằng các phương thức như `get()`, `invalid`, `touched`.
- Hiển thị thông báo lỗi tương tự như Template-driven, nhưng truy cập qua `formControlName`.

---

## Kết luận

- **Template-driven Forms**: Phù hợp cho các form đơn giản, dễ triển khai, sử dụng two-way data binding.
- **Reactive Forms**: Phù hợp cho các form phức tạp, cung cấp khả năng kiểm soát tốt hơn, dễ test và bảo trì.
- Cả hai cách tiếp cận đều hỗ trợ validation mạnh mẽ, với các công cụ tích hợp sẵn trong Angular.
