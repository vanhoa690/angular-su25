import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type UserForm = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(values: UserForm) {
    return this.http.post('http://localhost:3001/register', values);
  }
}
