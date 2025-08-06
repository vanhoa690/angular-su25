import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type UserForm = {
  email: string;
  password: string;
};

type LoginRes = {
  accessToken: string;
  user: {
    email: string;
  };
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(values: UserForm) {
    return this.http.post('http://localhost:3001/register', values);
  }

  loginUser(values: UserForm) {
    return this.http.post<LoginRes>('http://localhost:3001/login', values);
  }
}
