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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  hasPermision(): boolean {
    const userInfo = localStorage.getItem('user');
    const user = JSON.parse(userInfo || '{}');
    return user.id === 2;
  }

  registerUser(values: UserForm) {
    return this.http.post('http://localhost:3001/register', values);
  }

  loginUser(values: UserForm) {
    return this.http.post<LoginRes>('http://localhost:3001/login', values);
  }

  getUser(userId: string) {
    return this.http.get<LoginRes>(`http://localhost:3001/users/${userId}`);
  }
}
