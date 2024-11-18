import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sport } from '../../../../models/enums/sport';
import { Event } from '../../../../models/event';

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

  loadObservation() {
    if (this.data.observation == null || this.data.observation == undefined) { return 'Sem observação' } else { return this.data.observation }
  }
}
