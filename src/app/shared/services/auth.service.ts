import { Injectable } from '@angular/core';

interface User {
  name: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = {
    name: 'João da Silva',
    avatar: 'assets/joao-avatar.png',
  };

  getUser(): User | null {
    return this.user;
  }

  logout() {
    this.user = null;
    // Implementar lógica de logout, como limpar tokens ou sessões
  }
}

