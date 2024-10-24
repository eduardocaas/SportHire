import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignup } from '../models/signup';
import { IDENTITY_CONFIG } from '../configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(user: UserSignup) {
    return this.http.post(`${IDENTITY_CONFIG.localUrl}/identity/users/signup`, user, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
