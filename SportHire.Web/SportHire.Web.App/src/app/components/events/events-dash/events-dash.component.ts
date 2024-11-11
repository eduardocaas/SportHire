import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Status } from '../../../models/enums/status';
import { EventService, MockEventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { animate, style, transition, trigger } from '@angular/animations';
import { Sport } from '../../../models/enums/sport';

@Component({
  selector: 'app-events-dash',
  templateUrl: './events-dash.component.html',
  styleUrl: './events-dash.component.css',
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'warn' },
  }],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EventsDashComponent implements OnInit {

  constructor(
    private readonly mockService: MockEventService,
    private readonly service: EventService
  ) {}

  ngOnInit() {
    this.loadInProgressEvents();
  }

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
    this.mockService.getInProgressByEmailOwner("owner1@example.com").subscribe(events => {
      this.inProgressEvents = events;
    });

    if (this.inProgressEvents.length == 0) {
      this.loadInProgressCardsContent(2);
    }
    if (this.inProgressEvents.length > 0 && this.inProgressEvents.length <= 3) {
      this.loadInProgressCardsContent(3)
    }
    if (this.inProgressEvents.length > 3) {
      this.loadInProgressCardsContent(1);
    }

    // Paginator
    const startIndex = this.inPcurrentPage * this.inPitemsPerPage;
    // Cards
    this.displayedInProgressEvents = this.inProgressEvents.slice(startIndex, startIndex + this.inPitemsPerPage);
  }

  // Paginator
  nextInPPage() {
    if ((this.inPcurrentPage + 1) * this.inPitemsPerPage < this.inProgressEvents.length) {
      this.inPcurrentPage++;
      this.loadInProgressEvents();
    }
  }

  // Paginator
  previousInPPage() {
    if (this.inPcurrentPage > 0) {
      this.inPcurrentPage--;
      this.loadInProgressEvents();
    }
  }

  loadInProgressCardsContent(opt: number) {
    let header = document.querySelector('#ts--headerInP') as HTMLElement;
    let paginator = document.querySelector('#ts--inPpaginator') as HTMLElement;
    let empty_content = document.querySelector('#ts--empty-inProgress') as HTMLElement;

    if (paginator !== null && header !== null && empty_content !== null) {

      // Carrega conteúdo
      if (opt == 1) {
        header.style.display = 'flex';
        paginator.style.display = 'flex';
        empty_content.style.display = 'none';
      }
      // Limpa a tela
      if (opt == 2) {
        this.inProgressEvents = [];
        this.displayedInProgressEvents = [];
        header.style.display = 'none';
        paginator.style.display = 'none';
        empty_content.style.display = 'flex';
      }
      // Carrega conteúdo - sem paginator
      if (opt == 3) {
        header.style.display = 'flex';
        paginator.style.display = 'none';
        empty_content.style.display = 'none';
      }
    }
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

  // Retorna o título para determinado esporte - card
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

