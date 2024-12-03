import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfile } from '../../../../models/enums/profile';
import { Event } from '../../../../models/event';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { WalletService } from '../../../../services/wallet.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {

  event: Event;
  profile: number;

  isChecked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: Event, profile: number },
    private readonly _walletService: WalletService,
    private readonly _service: EventService,
    private readonly _toast: ToastrService)
    {
      this.event = data.event;
      this.profile = data.profile;
    }

    confirm() {
      this._service.confirm(this.event.id!, this.profile).subscribe({
        next: (response) => {
          if (
            response.message == 'Evento confirmado, o valor será pago ao jogador' ||
            response.message == 'Evento confirmado, o pagamento será adicionado a sua carteira')  {
              this.payment();
            }
          this._toast.success(response.message, 'Evento', { positionClass: 'toast-bottom-center' });
          timer(3000).subscribe(() => { window.location.reload(); });
        },
        error: (err) => {
          console.error('Erro na requisição:', err); // Log
          if (err.status === 404) {
            this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
          } else if (err.error?.message) {
            this._toast.error(err.error.message, 'Erro ao cancelar', { positionClass: 'toast-bottom-center' });
          } else {
            console.log(err.status);
            this._toast.error('Erro no servidor', 'Erro', { positionClass: 'toast-bottom-center' });
          }
        }
      });
    }

    payment() {
      this._walletService.depositPlayer(this.event.cost, this.event.emailPlayer!).subscribe({
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
