import { Observable } from "rxjs";

export interface IWalletService {
  getBalance(): Observable<any>;
  deposit(amount: number): Observable<void>;
  withdraw(amount: number): Observable<any>;
}
