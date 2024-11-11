import { Component } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Status } from '../../../models/enums/status';
import { EventService, MockEventService } from '../../../services/event.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-events-dash',
  templateUrl: './events-dash.component.html',
  styleUrl: './events-dash.component.css',
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'warn' },
  }]
})
export class EventsDashComponent {

  constructor(
    private readonly mockService: MockEventService,
    private readonly service: EventService
  ) {}

  status = [
    { opt: Status.ABERTO, name: 'Aberto' },
    { opt: Status.ANDAMENTO, name: 'Andamento' }
  ];

  selectedStatus: number | null = null;

  /* --- CARDS EVENTOS --- */

  // Inicia variáveis relacionada aos eventos e paginator - card
  inProgressEvents: Event[] = [];
  displayedInProgressEvents: Event[] = [];
  inPcurrentPage: number = 0;
  inPitemsPerPage: number = 3;

  // Carrega eventos na tela
  loadInProgressEvents() {
    this.mockService.getInProgressByEmailOwner("owner1@email.com").subscribe(events => {
      this.inProgressEvents = events;
    });
  }

  // Paginator
  nextPage() {
    if ((this.inPcurrentPage + 1) * this.inPitemsPerPage < this.inProgressEvents.length) {
      this.inPcurrentPage++;
      this.loadInProgressEvents();
    }
  }

  // Paginator
  previousPage() {
    if (this.inPcurrentPage > 0) {
      this.inPcurrentPage--;
      this.loadInProgressEvents();
    }
  }
}

