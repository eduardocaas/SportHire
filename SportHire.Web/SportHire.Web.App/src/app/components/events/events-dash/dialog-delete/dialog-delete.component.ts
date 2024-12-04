import { Component, Inject } from '@angular/core';
import { Event } from '../../../../models/event';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { WalletService } from '../../../../services/wallet.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private readonly _walletService: WalletService,
    private readonly _service: EventService,
    private readonly _toast: ToastrService) {}

  isChecked = false;

  cancel() {
    this._service.cancel(this.data.id!).subscribe(response => {
      if (this.data.status == 2) {
        this.payment();
        this._toast.success('Evento cancelado com sucesso! O jogador será notificado', 'Evento', { positionClass: 'toast-bottom-center' });
        timer(2500).subscribe(x => { window.location.reload(); })
      }
      else {
        this.payment();
        this._toast.success('Evento cancelado com sucesso!', 'Evento', { positionClass: 'toast-bottom-center' });
        timer(2500).subscribe(x => { window.location.reload(); })
      }
    }, err => {
      if (err.status == 404) {
        this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
      }
      else if (err.error.errors) {
        err.error.errors.forEach((e: { message: string | undefined; }) => {
          this._toast.error(e.message, 'Erro ao cancelar', { positionClass: 'toast-bottom-center' });
        });
      }
      else {
        console.log(err.status);

        this._toast.error(err.error.message, 'Erro ao cancelar', { positionClass: 'toast-bottom-center' });
      }
    });
  }

  payment() {
    this._walletService.deposit(this.data.cost).subscribe({
      next: (response) => {
        console.log(response);
    },
    error: (err) => {
      console.error('Erro na requisição:', err); // Log
      if (err.status === 404) {
        this._toast.error('Usuário ou carteira não encontrados', 'Erro', { positionClass: 'toast-bottom-center' });
      }
      else if(err.status == 400) {
        this._toast.error(err.error.message, 'Erro ao pagar', { positionClass: 'toast-bottom-center' });
      }
      else if (err.error?.message) {
        this._toast.error(err.error.message, 'Erro ao pagar', { positionClass: 'toast-bottom-center' });
      } else {
        console.log(err.status);
        this._toast.error('Erro ao pagar', 'Erro', { positionClass: 'toast-bottom-center' });
      }
    }
    })
  }
}
