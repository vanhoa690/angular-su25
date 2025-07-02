import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  imports: [],
  templateUrl: './hello-world.html',
  styleUrl: './hello-world.css',
})
export class HelloWorld {
  // no const, let, var
  // type: :type , dua du lieu => suy dien type
  myName = 'hoadv';
  myAge = 35;
  hasPhone = true;
}
