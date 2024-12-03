import { Injectable } from '@angular/core';
import { IWalletService } from './interfaces/i.wallet.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IDENTITY_CONFIG } from '../configs/api.config';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService implements IWalletService {

  constructor(
    private readonly _http: HttpClient,
    private _authService: AuthService) { }

  getBalance(): Observable<any> {
    const email = this._authService.getEmail();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this._authService.getToken() }`);
    return this._http.get<any>(`${IDENTITY_CONFIG.localUrl}/identity/wallets/${email}`, { headers });
  }
  deposit(amount: number): Observable<void> {
    const email = this._authService.getEmail();
    const wallet: Wallet = new Wallet(email!, amount);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this._authService.getToken() }`);
    return this._http.put<any>(`${IDENTITY_CONFIG.localUrl}/identity/wallets/deposit`, wallet, { headers });
  }
  withdraw(amount: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
