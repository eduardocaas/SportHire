import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { IDENTITY_CONFIG } from '../configs/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthResponse } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: Credentials): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${IDENTITY_CONFIG.localUrl}/identity/users/login`, creds, {
      observe: 'response'
    });
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);

    const decodedToken = this.decodeToken(authToken);

    if (decodedToken) {
      const emailClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
      const nameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

      localStorage.setItem('email', decodedToken[emailClaim]);
      localStorage.setItem('name', decodedToken[nameClaim]);
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
