import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { IDENTITY_CONFIG } from '../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(creds: Credentials) {
    return this.http.post(`${IDENTITY_CONFIG.localUrl}/users/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }
}
