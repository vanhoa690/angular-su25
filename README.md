# Lập trình Front-End Framework 1 - WEB2081

# Hướng dẫn cài đặt Angular bản mới nhất và tạo ứng dụng cơ bản

## Giới thiệu

Hướng dẫn này sẽ giúp bạn cài đặt Angular phiên bản mới nhất (Angular 19, tính đến tháng 6/2025) bằng `pnpm`, giới thiệu các thành phần cơ bản của một dự án Angular, so sánh với các phiên bản Angular trước đó, và so sánh với React. Angular là một framework mạnh mẽ để xây dựng các ứng dụng web hiện đại, trong khi React là một thư viện nhẹ hơn, tập trung vào việc xây dựng giao diện người dùng.

### Các thành phần chính trong dự án Angular

- **`src/`**: Thư mục chứa mã nguồn chính của ứng dụng.
  - `app/app.component.ts`: Component chính của ứng dụng, định nghĩa giao diện và logic.
  - `app/app.module.ts`: Module gốc, nơi khai báo các component, service, và import module khác.
  - `main.ts`: Điểm vào chính, khởi động ứng dụng Angular.
  - `index.html`: File HTML gốc, nơi ứng dụng được render.
  - `styles.css`: File CSS toàn cục.
- **`angular.json`**: File cấu hình Angular CLI, quản lý build, serve, và các cấu hình khác.
- **`package.json`**: Chứa thông tin dự án và dependencies.
- **`pnpm-lock.yaml`**: File khóa phiên bản các gói, đảm bảo cài đặt nhất quán.
- **`tsconfig.json`**: File cấu hình TypeScript, định nghĩa các quy tắc biên dịch.

## Yêu cầu

- Node.js (phiên bản 18.12 hoặc cao hơn).
- `pnpm` (phiên bản mới nhất).
- Angular CLI (cài đặt toàn cục hoặc sử dụng `pnpm` để chạy).

## Hướng dẫn cài đặt

### 1. Cài đặt `pnpm`

Nếu chưa cài `pnpm`, chạy lệnh:

```bash
npm install -g pnpm
```

Hoặc sử dụng Corepack (có sẵn trong Node.js):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 2. Cài đặt Angular CLI

Cài đặt Angular CLI toàn cục:

```bash
pnpm add -g @angular/cli
```

### 3. Tạo dự án Angular mới

Chạy lệnh để tạo dự án mới với template TypeScript:

```bash
ng new my-angular-app --package-manager=pnpm --skip-install
```

- `my-angular-app`: Tên thư mục dự án.
- `--package-manager=pnpm`: Sử dụng `pnpm` thay vì `npm`.
- `--skip-install`: Bỏ qua cài đặt ban đầu để tùy chỉnh.

### 4. Di chuyển vào thư mục dự án

```bash
cd my-angular-app
```

### 5. Cài đặt dependencies

Cài đặt các gói cần thiết:

```bash
pnpm install
```

Lưu ý: Chọn No hết nếu trong quá trình cài đặt hỏi lựa chọn Yes/No

Lưu ý: Nếu gặp lỗi liên quan đến cấu trúc `node_modules`, thêm cấu hình vào `.npmrc`:

```bash
echo "node-linker=hoisted" > .npmrc
pnpm install
```

### 6. Chạy dự án

Khởi động server phát triển:

```bash
pnpm start
```

Mở trình duyệt và truy cập `http://localhost:4200` để xem ứng dụng.

### 7. Build dự án

Để build ứng dụng cho production:

```bash
pnpm build
```

Kết quả sẽ nằm trong thư mục `dist`.

### 8. Cấu trúc dự án

Cấu trúc cơ bản của dự án Angular:

```
my-angular-app/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
├── .gitignore
├── angular.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
```

## So sánh với các phiên bản Angular trước đó

Angular 19 mang đến nhiều cải tiến so với các phiên bản trước. Dưới đây là so sánh với Angular 6 và Angular 8:

| **Tính năng**             | **Angular 6 (2018)**        | **Angular 8 (2019)**                      | **Angular 19 (2024)**                           |
| ------------------------- | --------------------------- | ----------------------------------------- | ----------------------------------------------- |
| **Standalone Components** | Không hỗ trợ                | Không hỗ trợ                              | Hỗ trợ mặc định, giảm sự phụ thuộc vào NgModule |
| **Hydration**             | Không hỗ trợ                | Không hỗ trợ                              | Hỗ trợ incremental hydration, cải thiện SSR     |
| **CLI Improvements**      | CLI cơ bản, ít tùy chỉnh    | Cải tiến CLI, hỗ trợ differential loading | CLI mạnh mẽ, codemods tự động hóa nâng cấp      |
| **TypeScript**            | TypeScript 2.7              | TypeScript 3.4                            | TypeScript 5.5+ (hỗ trợ type inference tốt hơn) |
| **Ivy Renderer**          | Không có (View Engine)      | Giới thiệu Ivy (tùy chọn)                 | Ivy là mặc định, tối ưu kích thước bundle       |
| **Performance**           | Chậm hơn, bundle lớn        | Cải thiện với Ivy                         | Tối ưu hóa vượt trội, đặc biệt với SSR và AOT   |
| **Theming**               | Cơ bản, chủ yếu dựa vào CSS | Cải thiện với Material                    | Tăng cường theming động và dễ tùy chỉnh         |

**Nhận xét**:

- Angular 6 và 8 sử dụng `NgModule`, gây phức tạp trong cấu hình và quản lý dependencies.
- Angular 19 đơn giản hóa với standalone components, cải thiện hiệu suất và hỗ trợ server-side rendering (SSR) tốt hơn.
- Các tính năng như `linkedSignal`, `renderEffect`, và `resource` trong Angular 19 giúp quản lý trạng thái và tài nguyên hiệu quả hơn.

## So sánh với React

| **Tiêu chí**         | **Angular 19**                             | **React (v18)**                                                       |
| -------------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| **Loại**             | Framework đầy đủ                           | Thư viện UI                                                           |
| **Ngôn ngữ**         | TypeScript (bắt buộc)                      | JavaScript/TypeScript (tùy chọn)                                      |
| **Cấu trúc**         | Module-based, hỗ trợ standalone components | Component-based, linh hoạt hơn                                        |
| **State Management** | Signals, RxJS                              | Hooks (`useState`, `useReducer`), thư viện bên ngoài (Redux, Zustand) |
| **Routing**          | `@angular/router` tích hợp sẵn             | Cần thư viện (`react-router-dom`)                                     |
| **CSS**              | CSS/SCSS tích hợp, hỗ trợ theming động     | CSS-in-JS, Tailwind, hoặc CSS modules                                 |
| **Hiệu suất**        | Tối ưu với Ivy, AOT, và SSR                | Nhẹ, nhưng cần tối ưu thủсию                                          |

| **Build Tool** | Angular CLI (với Webpack, esbuild) | Vite, Webpack, hoặc các công cụ khác |
| **Learning Curve** | Cao hơn, do tích hợp nhiều tính năng | Dễ hơn, tập trung vào UI |
| **Ecosystem** | Tích hợp chặt chẽ (CLI, Material, Router) | Linh hoạt, nhưng cần thêm thư viện |
| **Disk Efficiency** | Nhiều node_modules riêng biệt (trừ khi dùng pnpm) | Tương tự, nhưng pnpm giảm dung lượng đáng kể |[](https://www.npmjs.com/package/pnpm)[](https://refine.dev/blog/how-to-use-pnpm/)

**Nhận xét**:

- **Angular**: Phù hợp với các dự án lớn, cần cấu trúc rõ ràng, tích hợp nhiều tính năng sẵn có (routing, forms, HTTP client). Tuy nhiên, learning curve cao hơn và bundle size lớn hơn nếu không tối ưu.
- **React**: Linh hoạt, nhẹ, phù hợp với dự án nhỏ hoặc cần tùy chỉnh cao. Tuy nhiên, yêu cầu thêm thư viện cho các tính năng như routing, state management, hoặc form handling.
- **pnpm**: Cả hai đều được hưởng lợi từ `pnpm` nhờ tiết kiệm không gian đĩa và tốc độ cài đặt nhanh hơn npm/yarn.[](https://refine.dev/blog/how-to-use-pnpm/)

## Lệnh hữu ích

- `pnpm start`: Chạy server phát triển.
- `pnpm build`: Build ứng dụng cho production.
- `pnpm add <package>`: Cài đặt gói mới (ví dụ: `pnpm add @angular/material`).
- `pnpm remove <package>`: Gỡ gói.
- `ng generate component <name>`: Tạo component mới.
- `ng generate module <name>`: Tạo module mới.

## Tài nguyên bổ sung

- [Tài liệu Angular](https://angular.dev/)
- [Tài liệu pnpm](https://pnpm.io/)
- [Tài liệu TypeScript](https://www.typescriptlang.org/)
- [Tài liệu React](https://react.dev/)

Chúc bạn thành công với dự án Angular của mình!
