import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  name: string;
  password: string;
  username: string;
  avatar: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private user: User | null = {
    name: 'João da Silva',
    password: 'admin',
    username: 'admin@admin.com',
    avatar: 'assets/joao-avatar.png',
    isAdmin: true,
  };

  login(username: string, password: string): boolean {  
    if (username === this.user?.username && password === this.user?.password) { 
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return true;
    } 
    return false;
  }

  getLoggedInUser(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isUserAdmin(): boolean | null {
    const user = this.getLoggedInUser();
    return user && user.isAdmin;
  }
}

