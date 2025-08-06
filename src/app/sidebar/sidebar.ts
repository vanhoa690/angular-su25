import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const userInfo = localStorage.getItem('user');
    const user = JSON.parse(userInfo || '{}');
    if (!user.id) return;
    this.authService.getUser(user.id).subscribe({
      next: (data) => {
        console.log(data);
        this.isLogged = true;
      },
    });
  }
  handleLogout() {
    // remove token and user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
