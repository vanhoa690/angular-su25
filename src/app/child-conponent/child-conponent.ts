import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-conponent',
  imports: [],
  templateUrl: './child-conponent.html',
  styleUrl: './child-conponent.css',
})
export class ChildConponent {
  @Input() childData: string = 'stk cua con';
}
