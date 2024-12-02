import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../../../models/event';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dialog-quit',
  templateUrl: './dialog-quit.component.html',
  styleUrl: './dialog-quit.component.css'
})
export class DialogQuitComponent {

  isChecked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private readonly _service: EventService,
    private readonly _toast: ToastrService) {}

    quit() {
      this._service.quit(this.data.id!).subscribe(response => {
        this._toast.success('Você desistiu do evento! O criador do evento será notificado', 'Evento', { positionClass: 'toast-bottom-center' });
        timer(2000).subscribe(x => { window.location.reload(); })
      }, err => {
        if (err.status == 404) {
          this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
        }
        else if (err.error.errors) {
          err.error.errors.forEach((e: { message: string | undefined; }) => {
            this._toast.error(e.message, 'Erro ao desistir', { positionClass: 'toast-bottom-center' });
          });
        }
        else {
          console.log(err.status);

          this._toast.error(err.error.message, 'Erro ao desistir', { positionClass: 'toast-bottom-center' });
        }
      });
    }
}
