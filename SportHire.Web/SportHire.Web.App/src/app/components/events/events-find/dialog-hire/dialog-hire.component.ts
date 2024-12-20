import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sport } from '../../../../models/enums/sport';
import { Event } from '../../../../models/event';
import { EventService } from '../../../../services/event.service';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-hire',
  templateUrl: './dialog-hire.component.html',
  styleUrl: './dialog-hire.component.css'
})
export class DialogHireComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private readonly _service: EventService,
    private _toast: ToastrService,
    private _router: Router,
    private dialogRef: MatDialogRef<DialogHireComponent>
  ) { }

  isChecked = false;

  updatePlayer() {
    this._service.updatePlayer(this.data.id!).subscribe(response => {
      this._toast.success('Inscrição confirmada com sucesso!', 'Evento', { positionClass: 'toast-bottom-center', timeOut: 2000 });
      timer(1000).subscribe(() => {
        this._router.navigate(['/events/dash'], { queryParams: { opt: 2 }}).then(() => {
          this.dialogRef.close();
        });
      });
    }, err => {
      if (err.status == 404) {
        this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
      }
      else if (err.error.errors) {
        err.error.errors.forEach((e: { message: string | undefined; }) => {
          this._toast.error(e.message, 'Erro ao inscrever', { positionClass: 'toast-bottom-center' });
          console.error(err.error.errors);
        });
      }
      else {
        this._toast.error(err.error, 'Erro ao inscrever', { positionClass: 'toast-bottom-center' });
      }
    });
  }

// Retorna o titulo para determinado esporte - card
loadTitle(sport: Sport) {
  switch (sport) {
    case Sport.BASQUETE:
      return 'Basquete';
    case Sport.FUTEBOL:
      return 'Futebol';
    case Sport.VOLEI_PRAIA:
      return 'Vôlei de Praia';
    default:
      return '';
  }
}
}
