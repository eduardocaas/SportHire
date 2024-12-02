import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sport } from '../../../../models/enums/sport';
import { Event } from '../../../../models/event';
import { Status } from '../../../../models/enums/status';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { UserProfile } from '../../../../models/enums/profile';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrl: './dialog-info.component.css'
})
export class DialogInfoComponent {

  event: Event;
  profile: UserProfile;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: Event, profile: number },
    private readonly _service: EventService,
    private readonly _toast: ToastrService) {
      this.event = data.event;
      this.profile = data.profile;
    }

  // Retorna o jpg para determinado esporte - card
  loadImage(sport: Sport) {
    switch (sport) {
      case Sport.BASQUETE:
        return 'basquete.jpg';
      case Sport.FUTEBOL:
        return 'futebol.jpg';
      case Sport.VOLEI_PRAIA:
        return 'volei_praia.jpg';
      default:
        return '';
    }
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

  // Retorna o titulo do status para determinado status - card
  loadStatus(status: Status | undefined) {
    switch (status) {
      case Status.ABERTO:
        return 'Aberto';
      case Status.ANDAMENTO:
        return 'Andamento';
      case Status.CANCELADO:
        return 'Cancelado';
      case Status.CONCLUIDO:
        return 'Concluído';
      default:
        return '';
    }
  }

  // Verifica se data de término foi ultrapassada
  checkEndDate(event: Event): boolean {

    let dateNow: Date = new Date(); // Agora dateNow é do tipo Date
    let endDate = new Date(event.startDate);
    endDate.setMinutes(endDate.getMinutes() + event.duration);

    if (endDate <= dateNow) {
      return true;
    }
    return false;
  }

  quit() {
    this._service.quit(this.event.id!, UserProfile.OWNER).subscribe({
      next: (response) => {
        this._toast.success(`Você removeu o jogador! Remoções utilizadas: ${response.attempts} de 3`, 'Evento', { positionClass: 'toast-bottom-center' });
        timer(2500).subscribe(() => { window.location.reload(); });
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
