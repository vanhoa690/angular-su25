import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // if (this.registerForm.valid) {
    console.log(this.loginForm.value);
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        this.toast.success('Login success');
        localStorage.setItem('token', data.accessToken);
      },
      error: () => {},
    });
    // }
  }
}
