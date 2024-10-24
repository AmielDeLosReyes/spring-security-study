import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  isTokenValid(token: string): boolean {
    return !!token;
  }
}
