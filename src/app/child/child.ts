import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Output() customEvent = new EventEmitter<string>();

  sendData() {
    this.customEvent.emit('Data from child');
  }

  @ContentChild('content') content!: ElementRef;

  ngAfterContentInit() {
    console.log(this.content.nativeElement.textContent);
  }
}
