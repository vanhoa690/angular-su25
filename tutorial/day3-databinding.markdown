# Hướng dẫn Angular 19: Thao tác Databinding, Pipes, ViewChild, ContentChild và Lifecycle Hooks

## 1. Thao tác Databinding với Property

Property Binding trong Angular cho phép liên kết dữ liệu từ component đến các thuộc tính của phần tử HTML hoặc directive.

### Cú pháp:

```html
<element [property]="expression"></element>
```

### Ví dụ:

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  name = "John Doe";
  imageUrl = "https://example.com/image.jpg";
}
```

```html
<!-- app.html -->
<input [value]="name" />
<img [src]="imageUrl" />
```

```css
/* app.css */
input {
  padding: 5px;
  margin: 10px;
}
img {
  max-width: 200px;
}
```

### Giải thích:

- `[value]="name"`: Liên kết thuộc tính `value` của input với biến `name` trong component.
- Khi giá trị của `name` thay đổi, giao diện sẽ tự động cập nhật.

## 2. Thao tác Databinding với Event và Custom Binding

Event Binding cho phép xử lý các sự kiện từ người dùng (click, keyup, v.v.) và thực thi logic trong component.

### Cú pháp:

```html
<element (event)="handler()"></element>
```

### Ví dụ:

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  onClick() {
    console.log("Button clicked!");
  }

  onKeyUp(event: KeyboardEvent) {
    console.log("Key pressed:", event.key);
  }
}
```

```html
<!-- app.html -->
<button (click)="onClick()">Click me</button>
<input (keyup)="onKeyUp($event)" />
```

```css
/* app.css */
button {
  padding: 10px;
  margin: 10px;
}
```

### Custom Event Binding với @Output:

```typescript
// child.ts
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.html",
  styleUrls: ["./child.css"],
})
export class ChildComponent {
  @Output() customEvent = new EventEmitter<string>();

  sendData() {
    this.customEvent.emit("Data from child");
  }
}
```

```html
<!-- child.html -->
<button (click)="sendData()">Send Data</button>
```

```css
/* child.css */
button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
}
```

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  receiveData(data: string) {
    console.log(data); // Output: Data from child
  }
}
```

```html
<!-- app.html -->
<app-child (customEvent)="receiveData($event)"></app-child>
```

## 3. Định dạng hiển thị với Pipes hệ thống

Pipes trong Angular dùng để chuyển đổi dữ liệu trước khi hiển thị.

### Một số Pipes hệ thống phổ biến:

- `DatePipe`: Định dạng ngày tháng.
- `UpperCasePipe`: Chuyển đổi thành chữ hoa.
- `LowerCasePipe`: Chuyển đổi thành chữ thường.
- `CurrencyPipe`: Định dạng tiền tệ.
- `PercentPipe`: Định dạng phần trăm.

### Ví dụ:

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  today = new Date();
  name = "angular";
  price = 100;
}
```

```html
<!-- app.html -->
<p>Date: {{ today | date:'dd/MM/yyyy' }}</p>
<p>Uppercase: {{ name | uppercase }}</p>
<p>Currency: {{ price | currency:'USD' }}</p>
```

```css
/* app.css */
p {
  font-size: 16px;
  margin: 10px;
}
```

### Tạo Custom Pipe:

```typescript
// custom.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "reverse" })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split("").reverse().join("");
  }
}
```

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  text = "hello";
}
```

```html
<!-- app.html -->
<p>{{ text | reverse }}</p>
<!-- Output: olleh -->
```

## 4. Hiểu và ứng dụng ViewChild() và ContentChild()

`ViewChild` và `ContentChild` dùng để truy cập các phần tử hoặc component trong template.

### ViewChild

Truy cập phần tử/component con trong template của component hiện tại.

```typescript
// app.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("myInput") input: ElementRef;

  ngAfterViewInit() {
    console.log(this.input.nativeElement); // Truy cập DOM element
  }

  focusInput() {
    this.input.nativeElement.focus();
  }
}
```

```html
<!-- app.html -->
<input #myInput />
<button (click)="focusInput()">Focus Input</button>
```

```css
/* app.css */
input,
button {
  margin: 10px;
}
```

### ContentChild

Truy cập nội dung được truyền vào từ `<ng-content>`.

```typescript
// child.ts
import {
  Component,
  ContentChild,
  ElementRef,
  AfterContentInit,
} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.html",
  styleUrls: ["./child.css"],
})
export class ChildComponent implements AfterContentInit {
  @ContentChild("content") content: ElementRef;

  ngAfterContentInit() {
    console.log(this.content.nativeElement.textContent);
  }
}
```

```html
<!-- child.html -->
<ng-content></ng-content>
```

```css
/* child.css */
p {
  color: blue;
}
```

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {}
```

```html
<!-- app.html -->
<app-child><p #content>Hello World</p></app-child>
```

## 5. Gắn kết thuộc tính trong Angular (@Input)

`@Input` cho phép truyền dữ liệu từ component cha sang component con.

```typescript
// child.ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.html",
  styleUrls: ["./child.css"],
})
export class ChildComponent {
  @Input() childData: string;
}
```

```html
<!-- child.html -->
<p>{{ childData }}</p>
```

```css
/* child.css */
p {
  font-weight: bold;
}
```

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  parentData = "Data from parent";
}
```

```html
<!-- app.html -->
<app-child [childData]="parentData"></app-child>
```

## 6. Gắn kết sự kiện (@Output)

`@Output` cho phép component con gửi dữ liệu/sự kiện đến component cha (xem phần Custom Event Binding).

## 7. Gắn kết dữ liệu 2 chiều

Two-way binding kết hợp property binding và event binding, thường dùng với `ngModel`.

### Ví dụ:

```typescript
// app.module.ts
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```typescript
// app.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  name = "Angular";
}
```

```html
<!-- app.html -->
<input [(ngModel)]="name" />
<p>You typed: {{ name }}</p>
```

```css
/* app.css */
input {
  padding: 5px;
}
p {
  margin-top: 10px;
}
```

## 8. Gắn kết component với @Input, @Output, @ViewChild

Kết hợp các kỹ thuật trên để giao tiếp giữa các component.

```typescript
// child.ts
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.html",
  styleUrls: ["./child.css"],
})
export class ChildComponent {
  @Input() data: string;
  @Output() event = new EventEmitter<string>();

  send() {
    this.event.emit("Event from child");
  }
}
```

```html
<!-- child.html -->
<p>{{ data }}</p>
<button (click)="send()">Send</button>
```

```css
/* child.css */
p {
  color: green;
}
button {
  background-color: #28a745;
  color: white;
}
```

```typescript
// app.ts
import { Component, ViewChild } from "@angular/core";
import { ChildComponent } from "./child";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class AppComponent {
  @ViewChild(ChildComponent) child: ChildComponent;
  parentData = "Hello from parent";

  handleEvent(data: string) {
    console.log(data); // Output: Event from child
  }
}
```

```html
<!-- app.html -->
<app-child [data]="parentData" (event)="handleEvent($event)"></app-child>
```

## 9. Hiểu và cài đặt Lifecycle Hooks

Angular cung cấp các lifecycle hooks để thực thi logic tại các thời điểm cụ thể trong vòng đời component.

### Các Lifecycle Hooks phổ biến:

- `ngOnInit`: Khởi tạo component.
- `ngOnChanges`: Khi input binding thay đổi.
- `ngAfterViewInit`: Sau khi view được khởi tạo.
- `ngOnDestroy`: Trước khi component bị hủy.

### Ví dụ:

```typescript
// lifecycle.ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

@Component({
  selector: "app-lifecycle",
  templateUrl: "./lifecycle.html",
  styleUrls: ["./lifecycle.css"],
})
export class LifecycleComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() data: string;

  ngOnChanges() {
    console.log("ngOnChanges: Input changed", this.data);
  }

  ngOnInit() {
    console.log("ngOnInit: Component initialized");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit: View initialized");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy: Component destroyed");
  }
}
```

```html
<!-- lifecycle.html -->
<p>{{ data }}</p>
```

```css
/* lifecycle.css */
p {
  font-style: italic;
}
```

### Ứng dụng thực tế:

- Sử dụng `ngOnInit` để tải dữ liệu ban đầu.
- Sử dụng `ngOnDestroy` để dọn dẹp (hủy subscriptions, timers, v.v.).
