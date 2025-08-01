// toast.service.ts
import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import CSS

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'center', y: 'top' },
  });

  success(msg: string) {
    this.notyf.success(msg);
  }

  error(msg: string) {
    this.notyf.error(msg);
  }

  info(msg: string) {
    this.notyf.open({ type: 'info', message: msg });
  }

  warning(msg: string) {
    this.notyf.open({ type: 'warning', message: msg });
  }
}
