import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

  previousUrl: string = '';
  balance: number = 0;
  amountInput: number = 0;

  constructor(
    private _walletService: WalletService,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private _toast: ToastrService
  ) { this.selectedOption = 1 }

  ngOnInit() {
    this._walletService.getBalance().subscribe(response => {
      this.balance = response.balance;
    })

    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl || ''; // Atualiza a URL anterior quando disponível
      if (this.previousUrl == "/events/find") {
        this.selectedOption = 1;
      } else {
        this.selectedOption = 2;
      }
    });
  }

  selectedOption: number | null = null;

  changeProfile(opt: number) {
    this.selectedOption = opt == 1 ? 1 : 2;
  }

  deposit() {
    if (this.amountInput < 15 ) {
      this._toast.error('Adicione um valor maior que 15', 'Depósito', { positionClass: 'toast-bottom-center' });
    }
    else {
      this._walletService.deposit(this.amountInput).subscribe({
        next: (response) => {
            this._toast.success(`Você depositou ${this.amountInput} com sucesso!`, 'Depósito', { positionClass: 'toast-bottom-center' });
            timer(1000).subscribe(() => { window.location.reload(); });
        },
        error: (err) => {
          console.error('Erro na requisição:', err); // Log
          if (err.status === 404) {
            this._toast.error('Usuário ou carteira não encontrados', 'Erro', { positionClass: 'toast-bottom-center' });
          } else if (err.error?.message) {
            this._toast.error(err.error.message, 'Erro ao depositar', { positionClass: 'toast-bottom-center' });
          } else {
            console.log(err.status);
            this._toast.error('Erro ao depositar', 'Erro', { positionClass: 'toast-bottom-center' });
          }
        }
      });
    }
  }
}
