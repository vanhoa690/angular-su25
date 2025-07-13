import { Component, ElementRef, ViewChild } from '@angular/core';
import { Child } from './child/child';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './custom.pipe';

@Component({
  selector: 'app-root',
  imports: [Child, CommonModule, ReversePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // today = new Date();
  // name = 'angular';
  // price = 100;
  // text = 'hello';
  // imageUrl =
  //   'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrZxNYvYz2wz5zmYnikVx3gVjOwJQOK-yHbqNsbZdkkfo_AaMTXKKqCjednkLew57r19f2rNRrBQQ2Anoe9ysXWb3Ov5ncDw-7TP3tpsA';

  // onClick() {
  //   console.log('Button clicked!');
  // }

  // onKeyUp(event: KeyboardEvent) {
  //   console.log('Key pressed:', event.key);
  // }

  // receiveData(data: string) {
  //   console.log(data); // Output: Data from child
  // }

  @ViewChild('myInput') input!: ElementRef;

  ngAfterViewInit() {
    console.log(this.input.nativeElement); // Truy cập DOM element
  }

  focusInput() {
    this.input.nativeElement.focus();
  }
}
