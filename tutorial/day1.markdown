# Day 1: Hướng dẫn cơ bản về Angular

## Mục tiêu

- Hiểu được Angular là gì và các khái niệm cơ bản của nó.
- Biết cách thiết lập môi trường phát triển và tạo dự án Angular.
- Hiểu kiến trúc tổ chức của một dự án Angular.
- Làm quen với TypeScript và cách sử dụng style trong Angular.

## 1. Angular là gì?

Angular là một **framework** mã nguồn mở được phát triển bởi Google, dùng để xây dựng các ứng dụng web động, đơn trang (Single Page Applications - SPA). Angular sử dụng **TypeScript**, cung cấp một hệ sinh thái hoàn chỉnh với các công cụ như Angular CLI, router, forms, và HTTP client. Angular 19 (phiên bản mới nhất tính đến tháng 6/2025) sử dụng **Ivy renderer** và hỗ trợ **standalone components**, giúp giảm sự phụ thuộc vào NgModule.

### Các khái niệm cơ bản

- **Component**: Thành phần giao diện, bao gồm template (HTML), logic (TypeScript), và style (CSS/SCSS).
- **Module**: Nhóm các component, service, và directive, giúp tổ chức ứng dụng (tùy chọn trong Angular 19 với standalone components).
- **Service**: Lớp xử lý logic nghiệp vụ, chia sẻ dữ liệu giữa các component.
- **Directive**: Mở rộng hành vi của HTML (ví dụ: `ngIf`, `ngFor`).
- **Dependency Injection**: Cơ chế cung cấp các service hoặc dữ liệu cho component.
- **Data Binding**: Kết nối dữ liệu giữa TypeScript và template (bao gồm one-way và two-way binding).

## 2. Môi trường phát triển

### Yêu cầu

- **Node.js**: Phiên bản 18.12 hoặc cao hơn.
- **pnpm**: Công cụ quản lý gói, nhanh và tiết kiệm không gian đĩa.
- **Angular CLI**: Công cụ dòng lệnh để tạo, chạy, và quản lý dự án Angular.
- Code editor: VS Code (khuyến nghị) hoặc bất kỳ editor nào hỗ trợ TypeScript.

### Cài đặt

1. **Cài đặt Node.js**:
   Tải và cài đặt Node.js từ [nodejs.org](https://nodejs.org/). Kiểm tra phiên bản:

   ```bash
   node -v
   npm -v
   ```

2. **Cài đặt pnpm**:

   ```bash
   npm install -g pnpm
   ```

   Hoặc sử dụng Corepack:

   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

   Kiểm tra phiên bản:

   ```bash
   pnpm -v
   ```

3. **Cài đặt Angular CLI**:
   ```bash
   pnpm add -g @angular/cli
   ```
   Kiểm tra phiên bản:
   ```bash
   ng version
   ```

## 3. Tạo và thực thi Project với Angular

### Tạo dự án

Chạy lệnh sau để tạo dự án Angular mới:

```bash
ng new my-angular-app --package-manager=pnpm --skip-install
```

- `my-angular-app`: Tên dự án.
- `--package-manager=pnpm`: Sử dụng `pnpm` thay vì `npm`.
- `--skip-install`: Bỏ qua cài đặt ban đầu để tùy chỉnh.

### Di chuyển vào thư mục dự án

```bash
cd my-angular-app
```

### Cài đặt dependencies

```bash
pnpm install
```

Lưu ý: Chọn No hết nếu trong quá trình cài đặt hỏi lựa chọn Yes/No

Nếu gặp lỗi liên quan đến `node_modules`, thêm cấu hình:

```bash
echo "node-linker=hoisted" > .npmrc
pnpm install
```

### Chạy dự án

Khởi động server phát triển:

```bash
pnpm start
```

Mở trình duyệt và truy cập `http://localhost:4200` để xem ứng dụng mẫu.

### Build dự án

Build ứng dụng cho production:

```bash
pnpm build
```

Kết quả sẽ nằm trong thư mục `dist`.

## 4. Kiến trúc tổ chức của Angular

Cấu trúc dự án Angular được tổ chức chặt chẽ để dễ quản lý và mở rộng:

```
my-angular-app/
├── node_modules/              # Dependencies của dự án
├── src/                      # Thư mục mã nguồn
│   ├── app/                  # Thư mục chứa các component và logic
│   │   ├── app.ts            # Component chính
│   │   ├── app.html          # Template HTML
│   │   ├── app.css           # Style CSS/SCSS
│   │   ├── app.spec.ts       # File test
│   │   ├── app.ts            # Module gốc (tùy chọn với standalone components)
│   ├── assets/               # Tài nguyên tĩnh (hình ảnh, font, v.v.)
│   ├── index.html            # File HTML gốc
│   ├── main.ts               # Điểm vào chính của ứng dụng
│   ├── styles.css            # Style toàn cục
├── .gitignore                # Danh sách file/thư mục bỏ qua khi commit
├── angular.json              # Cấu hình Angular CLI
├── package.json              # Thông tin dự án và dependencies
├── pnpm-lock.yaml            # Khóa phiên bản gói
├── tsconfig.json             # Cấu hình TypeScript
├── tsconfig.app.json         # Cấu hình TypeScript cho ứng dụng
├── tsconfig.spec.json        # Cấu hình TypeScript cho test
```

### Giải thích các thành phần

- **app.ts**: Component chính, định nghĩa logic và dữ liệu.
- **app.html**: Template HTML cho giao diện.
- **app.css**: Style cho component.
- **app.ts**: Module gốc, khai báo các component, service, và import module khác (tùy chọn nếu dùng standalone components).
- **main.ts**: Khởi động ứng dụng bằng cách bootstrap component chính.
- **angular.json**: Cấu hình build, serve, và các tùy chọn khác của Angular CLI.

## 5. Style trong Angular

Angular hỗ trợ nhiều cách quản lý style:

- **CSS/SCSS trong component**: Mỗi component có file `.css` hoặc `.scss` riêng, tự động scoped để tránh xung đột.
  Ví dụ trong `app.css`:
  ```css
  h1 {
    color: blue;
  }
  ```
- **Style toàn cục**: File `styles.css` áp dụng cho toàn bộ ứng dụng.
- **Inline styles**: Sử dụng thuộc tính `[style]` hoặc `ngStyle` trong template:
  ```html
  <div [style.color]="'red'">Red text</div>
  ```
- **Angular Material**: Thư viện UI tích hợp, có thể cài đặt bằng:
  ```bash
  pnpm add @angular/material
  ```

Để sử dụng SCSS, cấu hình trong `angular.json`:

```json
"styles": [
  "src/styles.scss"
]
```

## 6. TypeScript là gì?

TypeScript là một **superset** của JavaScript, bổ sung hệ thống kiểu tĩnh (static types) để tăng độ an toàn và dễ bảo trì mã. Angular sử dụng TypeScript làm ngôn ngữ chính.

### Đặc điểm của TypeScript

- **Kiểu dữ liệu**: Xác định kiểu cho biến, tham số, và giá trị trả về:
  ```ts
  let name: string = "Angular";
  function greet(name: string): string {
    return `Hello, ${name}!`;
  }
  ```
- **Interface và Type**: Định nghĩa cấu trúc dữ liệu:
  ```ts
  interface User {
    id: number;
    name: string;
  }
  ```
- **Lớp (Class)**: Hỗ trợ lập trình hướng đối tượng:
  ```ts
  class User {
    constructor(public id: number, public name: string) {}
  }
  ```
- **Type Inference**: Tự động suy ra kiểu nếu không khai báo rõ ràng.
- **Biên dịch**: TypeScript được biên dịch thành JavaScript bằng `tsc`.

Angular tận dụng TypeScript để đảm bảo mã rõ ràng, dễ debug, và hỗ trợ các tính năng như dependency injection, decorators (`@Component`, `@NgModule`).

## Ví dụ: Component cơ bản

Tạo component mới bằng Angular CLI:

```bash
ng generate component hello-world
```

File `src/app/hello-world/helloWorld.ts`:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-hello-world",
  templateUrl: "./app-hello-world.html",
  styleUrls: ["./app-hello-world.css"],
})
export class HelloWorldComponent {
  name: string = "Angular";
}
```

Sử dụng trong `src/app/app.html`:

```html
<app-hello-world></app-hello-world>
```

## Lệnh hữu ích

- `pnpm start`: Chạy server phát triển.
- `pnpm build`: Build ứng dụng cho production.
- `ng generate component <name>`: Tạo component mới.
- `ng generate service <name>`: Tạo service mới.
- `pnpm add <package>`: Cài đặt gói mới.

## Tài nguyên bổ sung

- [Tài liệu Angular](https://angular.dev/)
- [Tài liệu TypeScript](https://www.typescriptlang.org/)
- [Tài liệu pnpm](https://pnpm.io/)
- [Angular CLI](https://angular.io/cli)

Chúc bạn bắt đầu hành trình học Angular thành công!
