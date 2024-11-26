import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Sport } from '../../../../models/enums/sport';
import { Event } from '../../../../models/event';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dialog-hire',
  templateUrl: './dialog-hire.component.html',
  styleUrl: './dialog-hire.component.css'
})
export class DialogHireComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    ) {}

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
