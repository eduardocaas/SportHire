import { Component, Inject } from '@angular/core';
import { Event } from '../../../../models/event';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private readonly _service: EventService,
    private readonly _toast: ToastrService) {}

  isChecked = false;

  cancel() {
    this._service.cancel(this.data.id!).subscribe(response => {
      this._toast.success('Evento cancelado com sucesso!', 'Evento', { positionClass: 'toast-bottom-center' });
      timer(1000).subscribe(x => { window.location.reload(); })
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
}
