import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  userAvatar: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getLoggedInUser();
    this.userName = user?.name ?? 'Usuário';
    this.userAvatar = 'assets/default-avatar.png';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  goHome() {
    this.router.navigate(['/home']);
  }
}
