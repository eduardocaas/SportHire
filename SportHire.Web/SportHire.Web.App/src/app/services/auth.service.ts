import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { IDENTITY_CONFIG } from '../configs/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: Credentials) {
    return this.http.post(`${IDENTITY_CONFIG.localUrl}/identity/users/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);

    const decodedToken = this.decodeToken(authToken);

    if (decodedToken) {
      localStorage.setItem('email', decodedToken.email);
      localStorage.setItem('name', decodedToken.name);
    }
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return null;
    }
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  getName(): string | null {
    return localStorage.getItem('name');
  }
}
