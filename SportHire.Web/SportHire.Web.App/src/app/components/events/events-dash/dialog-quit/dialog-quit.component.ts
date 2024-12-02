import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../../../models/event';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { UserProfile } from '../../../../models/enums/profile';

@Component({
  selector: 'app-dialog-quit',
  templateUrl: './dialog-quit.component.html',
  styleUrl: './dialog-quit.component.css'
})
export class DialogQuitComponent {

  event: Event;
  profile: UserProfile;

  isChecked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: Event, profile: number },
    private readonly _service: EventService,
    private readonly _toast: ToastrService) {
      this.event = data.event;
      this.profile = data.profile;
    }

    quit() {
      this._service.quit(this.event.id!, this.profile).subscribe({
        next: (response) => {
          if (this.profile == UserProfile.OWNER) {
            this._toast.success(`Você removeu o jogador! Remoções utilizadas: ${response.attempts} de 3`, 'Evento', { positionClass: 'toast-bottom-center' });
            timer(2500).subscribe(() => { window.location.reload(); });
          }
          else {
            this._toast.success('Você desistiu do evento! O criador do evento será notificado', 'Evento', { positionClass: 'toast-bottom-center' });
            timer(2500).subscribe(() => { window.location.reload(); });
          }
        },
        error: (err) => {
          console.error('Erro na requisição:', err); // Log
          if (err.status === 404) {
            this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
          } else if (err.error?.message) {
            this._toast.error(err.error.message, 'Erro ao desistir', { positionClass: 'toast-bottom-center' });
          } else {
            console.log(err.status);
            this._toast.error('Erro no desistir', 'Erro', { positionClass: 'toast-bottom-center' });
          }
        }
      });
    }
}
