import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Status } from '../../../models/enums/status';
import { EventService, MockEventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { animate, style, transition, trigger } from '@angular/animations';
import { Sport } from '../../../models/enums/sport';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlService } from '../../../services/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../../../models/enums/profile';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

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
  ],
})
export class EventsDashComponent implements OnInit {

  previousUrl: string = '';

  constructor(
    private readonly mockService: MockEventService,
    private readonly service: EventService,
    public dialog: MatDialog,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.selectedOption = 1 }

  ngOnInit() {
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl || ''; // Atualiza a URL anterior quando disponível
      if (this.previousUrl == "/events/find") {
        this.selectedOption = 1;
      }
    });
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      const opt = params['opt'];
      if (opt == '2') {
        this.selectedOption = 2;
      }
    });
    this.loadInProgressEvents();
    this.loadFinishedEvents();
  }

  status = [
    { opt: Status.DEFAULT, name: 'Todos' },
    { opt: Status.ABERTO, name: 'Aberto' },
    { opt: Status.ANDAMENTO, name: 'Andamento' }
  ];

  selectedOption: number | null = null;

  selectedStatus: number | null = null;
  selectedStatusText: string = 'andamento';
  selectedStatusText2: string = 'em';

  /* --- CARD PROXIMO --- */
  inProgressEvent: Event | null = null;

  loadNextEvent() {
    // Mock
    /* this.mockService.getInProgressByEmailOwner("owner1@example.com").subscribe(events => {
      if (events && events.length > 0) {
        this.inProgressEvent = events[0];
      } else {
        this.inProgressEvent = null;
      }
    }); */

    if (this.inProgressEvents.length > 0) {
      this.inProgressEvent = this.inProgressEvents[0];
    } else {
      this.inProgressEvent = null;
    }
  }

  /* --- CARDS EVENTOS --- */

  // Inicia variáveis relacionada aos eventos e paginator - card
  inProgressEvents: Event[] = [];
  displayedInProgressEvents: Event[] = [];
  inPcurrentPage: number = 0;
  inPitemsPerPage: number = 3;
  inProgressLength: number = 0;

  private displayedInProgressEventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  displayedInProgressEvents$: Observable<Event[]> = this.displayedInProgressEventsSubject.asObservable();

  // Carrega eventos na tela
  loadInProgressEvents() {
    /* this.mockService.getInProgressByEmailOwner("owner1@example.com").subscribe(events => {
      this.inProgressEvents = events;

      // Filtragem de eventos, aplicando o filtro por status se necessário
      let inProgressFilter = this.inProgressEvents;
      if (this.selectedStatus !== Status.DEFAULT && this.selectedStatus !== null) {
        inProgressFilter = this.inProgressEvents.filter(event => event.status == this.selectedStatus);
      }

      // Atualiza o comprimento dos eventos filtrados
      this.inProgressLength = inProgressFilter.length;

      // Calcula o número total de páginas baseadas na quantidade de itens filtrados
      const totalPages = Math.ceil(this.inProgressLength / this.inPitemsPerPage);

      // Se a página atual for maior que o número total de páginas, ajuste para a última página
      if (this.inPcurrentPage >= totalPages) {
        this.inPcurrentPage = totalPages - 1;  // Ajusta para a última página válida
      }

      // Calcula o início da página baseado no índice atual
      const startIndex = this.inPcurrentPage * this.inPitemsPerPage;

      // Define os eventos que serão exibidos com base na página atual e itens por página
      this.displayedInProgressEvents = inProgressFilter.slice(startIndex, startIndex + this.inPitemsPerPage);

      // Atualiza o conteúdo dos cards
      if (this.inProgressLength == 0) {
        this.loadInProgressCardsContent(2);  // Exibe a tela de "sem eventos"
      } else if (this.inProgressLength <= 3) {
        this.loadInProgressCardsContent(3);  // Exibe os eventos com no máximo 3 itens
      } else {
        this.loadInProgressCardsContent(1);  // Exibe a tela com o paginador
      }
    });
 */
    if (this.selectedOption == 1) {
      this.service.getByEmailOwner(1).subscribe(events => {
        this.inProgressEvents = events;
        this.loadNextEvent();

        // Filtragem de eventos, aplicando o filtro por status se necessário
        let inProgressFilter = this.inProgressEvents;
        if (this.selectedStatus !== Status.DEFAULT && this.selectedStatus !== null) {
          inProgressFilter = this.inProgressEvents.filter(event => event.status == this.selectedStatus);
        }

        // Atualiza o comprimento dos eventos filtrados
        this.inProgressLength = inProgressFilter.length;

        // Calcula o número total de páginas baseadas na quantidade de itens filtrados
        const totalPages = Math.ceil(this.inProgressLength / this.inPitemsPerPage);

        // Se a página atual for maior que o número total de páginas, ajuste para a última página
        if (this.inPcurrentPage >= totalPages) {
          this.inPcurrentPage = Math.max(0, totalPages - 1);  // Garante que a página seja válida
        }

        // Calcula o início da página baseado no índice atual
        const startIndex = this.inPcurrentPage * this.inPitemsPerPage;

        // Define os eventos que serão exibidos com base na página atual e itens por página
        //this.displayedInProgressEvents = inProgressFilter.slice(startIndex, startIndex + this.inPitemsPerPage);
        this.displayedInProgressEventsSubject.next(inProgressFilter.slice(startIndex, startIndex + this.inPitemsPerPage));

        // Atualiza o conteúdo dos cards
        if (this.inProgressLength == 0) {
          this.loadInProgressCardsContent(2);  // Exibe a tela de "sem eventos"
        } else if (this.inProgressLength <= 3) {
          this.loadInProgressCardsContent(3);  // Exibe os eventos com no máximo 3 itens
        } else {
          this.loadInProgressCardsContent(1);  // Exibe a tela com o paginador
        }
      });
    }
    if (this.selectedOption == 2) {
      this.service.getByEmailPlayer(1).subscribe(events => {
        this.inProgressEvents = events;
        this.loadNextEvent();

        // Filtragem de eventos, aplicando o filtro por status se necessário
        let inProgressFilter = this.inProgressEvents;
        if (this.selectedStatus !== Status.DEFAULT && this.selectedStatus !== null) {
          inProgressFilter = this.inProgressEvents.filter(event => event.status == this.selectedStatus);
        }

        // Atualiza o comprimento dos eventos filtrados
        this.inProgressLength = inProgressFilter.length;

        // Calcula o número total de páginas baseadas na quantidade de itens filtrados
        const totalPages = Math.ceil(this.inProgressLength / this.inPitemsPerPage);

        // Se a página atual for maior que o número total de páginas, ajuste para a última página
        if (this.inPcurrentPage >= totalPages) {
          this.inPcurrentPage = Math.max(0, totalPages - 1);  // Garante que a página seja válida
        }

        // Calcula o início da página baseado no índice atual
        const startIndex = this.inPcurrentPage * this.inPitemsPerPage;

        // Define os eventos que serão exibidos com base na página atual e itens por página
        //this.displayedInProgressEvents = inProgressFilter.slice(startIndex, startIndex + this.inPitemsPerPage);
        this.displayedInProgressEventsSubject.next(inProgressFilter.slice(startIndex, startIndex + this.inPitemsPerPage));

        // Atualiza o conteúdo dos cards
        if (this.inProgressLength == 0) {
          this.loadInProgressCardsContent(2);  // Exibe a tela de "sem eventos"
        } else if (this.inProgressLength <= 3) {
          this.loadInProgressCardsContent(3);  // Exibe os eventos com no máximo 3 itens
        } else {
          this.loadInProgressCardsContent(1);  // Exibe a tela com o paginador
        }
      });
    }
  }

  // Paginator - próximo
  nextInPPage() {
    const totalPages = Math.ceil(this.inProgressLength / this.inPitemsPerPage);
    if (this.inPcurrentPage < totalPages - 1) {
      this.inPcurrentPage++;
      this.loadInProgressEvents();
    }
  }

  // Paginator - anterior
  previousInPPage() {
    if (this.inPcurrentPage > 0) {
      this.inPcurrentPage--;
      this.loadInProgressEvents();
    }
  }

  loadInProgressCardsContent(opt: number) {
    let header = document.querySelector('#ts--headerInP_P') as HTMLElement;
    let paginator = document.querySelector('#ts--inPpaginator') as HTMLElement;
    let empty_content = document.querySelector('#ts--empty-inProgress') as HTMLElement;

    if (paginator !== null && header !== null && empty_content !== null) {
      // Carrega conteúdo
      if (opt == 1) {
        header.style.display = 'block';
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
        header.style.display = 'block';
        paginator.style.display = 'none';
        empty_content.style.display = 'none';
      }
    }
  }

  // Inicia variáveis relacionada aos eventos e paginator - card
  finishedEvents: Event[] = [];
  displayedFinishedEvents: Event[] = [];
  finCurrentPage: number = 0;
  finItemsPerPage: number = 3;

  // Carrega eventos na tela
  loadFinishedEvents() {
    /* this.mockService.getFinishedByEmailOwner("owner1@example.com").subscribe(events => {
      this.finishedEvents = events;
    });
 */

    if (this.selectedOption == 1) {
      this.service.getByEmailOwner(2).subscribe(events => {
        this.finishedEvents = events.reverse();
        ;

        if (this.finishedEvents.length == 0) {
          this.loadFinishedEventsCardsContent(2);
        }
        if (this.finishedEvents.length > 0 && this.finishedEvents.length <= 3) {
          this.loadFinishedEventsCardsContent(3)
        }
        if (this.finishedEvents.length > 3) {
          this.loadFinishedEventsCardsContent(1);
        }

        // Paginator
        const startIndex = this.finCurrentPage * this.finItemsPerPage;
        // Cards
        this.displayedFinishedEvents = this.finishedEvents.slice(startIndex, startIndex + this.finItemsPerPage);
      });
    }
    if (this.selectedOption == 2) {
      this.service.getByEmailPlayer(2).subscribe(events => {
        this.finishedEvents = events.reverse();
        ;

        if (this.finishedEvents.length == 0) {
          this.loadFinishedEventsCardsContent(2);
        }
        if (this.finishedEvents.length > 0 && this.finishedEvents.length <= 3) {
          this.loadFinishedEventsCardsContent(3)
        }
        if (this.finishedEvents.length > 3) {
          this.loadFinishedEventsCardsContent(1);
        }

        // Paginator
        const startIndex = this.finCurrentPage * this.finItemsPerPage;
        // Cards
        this.displayedFinishedEvents = this.finishedEvents.slice(startIndex, startIndex + this.finItemsPerPage);
      });
    }

  }

  // Paginator
  nextFinPage() {
    if ((this.finCurrentPage + 1) * this.finItemsPerPage < this.finishedEvents.length) {
      this.finCurrentPage++;
      this.loadFinishedEvents();
    }
  }

  // Paginator
  previousFinPage() {
    if (this.finCurrentPage > 0) {
      this.finCurrentPage--;
      this.loadFinishedEvents();
    }
  }

  loadFinishedEventsCardsContent(opt: number) {
    let header = document.querySelector('#ts--headerFin') as HTMLElement;
    let paginator = document.querySelector('#ts--finPaginator') as HTMLElement;
    let empty_content = document.querySelector('#ts--empty-Finished') as HTMLElement;

    if (paginator !== null && header !== null && empty_content !== null) {

      // Carrega conteúdo
      if (opt == 1) {
        header.style.display = 'block';
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
        header.style.display = 'block';
        paginator.style.display = 'none';
        empty_content.style.display = 'none';
      }
    }
  }

  changeProfile(opt: number) {
    this.selectedOption = opt == 1 ? 1 : 2;
    this.loadInProgressEvents();
    this.loadFinishedEvents();
  }

  openCreateDialog() {
    this.dialog.open(DialogCreateComponent, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  openEditDialog(event: Event) {
    this.dialog.open(DialogEditComponent, {
      data: event,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  openDeleteDialog(event: Event) {
    this.dialog.open(DialogDeleteComponent, {
      data: event,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  openInfoDialog(event: Event) {
    this.dialog.open(DialogInfoComponent, {
      data: event,
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  openConfirmDialog(event: Event, profile: number) {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        event: event,
        profile: profile
      },
      scrollStrategy: new NoopScrollStrategy()
    });
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

  loadStatus(event: Event) {
    if (event.status == Status.ANDAMENTO && this.checkEndDate(event)) {
      if (event.confirmOwner == false || event.confirmPlayer == false) { return 'Confirmação pendente' }
    }
    switch (event.status) {
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

  redirectFind() {
    this.router.navigate(['events/find']);
  }
}

