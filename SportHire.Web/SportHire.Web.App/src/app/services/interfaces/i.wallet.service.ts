import { Observable } from "rxjs";

export interface IWalletService {
  getBalance(): Observable<any>;
  deposit(amount: number): Observable<void>;
  depositPlayer(amount: number, emailPlayer: string): Observable<void>;
  withdraw(amount: number): Observable<any>;
}
