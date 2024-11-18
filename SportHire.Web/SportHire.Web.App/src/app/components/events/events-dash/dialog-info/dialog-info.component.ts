import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sport } from '../../../../models/enums/sport';
import { Event } from '../../../../models/event';
import { Status } from '../../../../models/enums/status';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrl: './dialog-info.component.css'
})
export class DialogInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Event) {}

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
}
