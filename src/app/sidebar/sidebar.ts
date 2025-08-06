import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isLogged: boolean = true;

  handleLogout() {
    // remove token and user
    // isLogged = false
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLogged = false;
  }
}
