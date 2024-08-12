import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private usersApiUrl = 'http://localhost:3000/users';
  
  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.usersApiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            sessionStorage.setItem('user', JSON.stringify(user));
            return true;
          }
          return false;
        })
      );
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

