import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { UF } from '../../../models/enums/uf';
import { Sport } from '../../../models/enums/sport';
import { Event } from '../../../models/event';
import { eventsFindPortoAlegreAberto } from '../../../mocks/events.mock';
import { EventService, MockEventService } from '../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-events-find',
  templateUrl: './events-find.component.html',
  styleUrl: './events-find.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EventsFindComponent {

  constructor(
    private readonly mockService: MockEventService,
    private readonly service: EventService,
    private toast: ToastrService
  ) { }

  /* --- FORMULÁRIO DE BUSCA --- */

  // Inicia formControl para campos
  sportControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

  // Define esportes a serem apresentados - select
  sports = [
    { opt: Sport.DEFAULT, name: 'Todos' },
    { opt: Sport.FUTEBOL, name: 'Futebol' },
    { opt: Sport.VOLEI_PRAIA, name: 'Vôlei de Praia' },
    { opt: Sport.BASQUETE, name: 'Basquete' }
  ]

  // Define estados a serem apresentados - select
  states = [
    /*     { uf: UF.AC, name: 'Acre' },
        { uf: UF.AL, name: 'Alagoas' },
        { uf: UF.AP, name: 'Amapá' },
        { uf: UF.AM, name: 'Amazonas' },
        { uf: UF.BA, name: 'Bahia' },
        { uf: UF.CE, name: 'Ceará' },
        { uf: UF.DF, name: 'Distrito Federal' },
        { uf: UF.ES, name: 'Espírito Santo' },
        { uf: UF.GO, name: 'Goiás' },
        { uf: UF.MA, name: 'Maranhão' },
        { uf: UF.MT, name: 'Mato Grosso' },
        { uf: UF.MS, name: 'Mato Grosso do Sul' },
        { uf: UF.MG, name: 'Minas Gerais' },
        { uf: UF.PA, name: 'Pará' },
        { uf: UF.PB, name: 'Paraíba' },
        { uf: UF.PR, name: 'Paraná' },
        { uf: UF.PE, name: 'Pernambuco' },
        { uf: UF.PI, name: 'Piauí' },
        { uf: UF.RJ, name: 'Rio de Janeiro' },
        { uf: UF.RN, name: 'Rio Grande do Norte' }, */
    { uf: UF.RS, name: 'Rio Grande do Sul' },
    /*     { uf: UF.RO, name: 'Rondônia' },
        { uf: UF.RR, name: 'Roraima' },
        { uf: UF.SC, name: 'Santa Catarina' }, */
    { uf: UF.SP, name: 'São Paulo' },
    /*  { uf: UF.SE, name: 'Sergipe' },
     { uf: UF.TO, name: 'Tocantins' } */
  ];

  // Define cidades a serem apresentados - select
  cities = [
    { name: 'Porto Alegre', uf: UF.RS },
    { name: 'Canoas', uf: UF.RS },
    { name: 'São Paulo', uf: UF.SP },
    { name: 'Campinas', uf: UF.SP }
  ];

  selectedSport: number | null = null;
  selectedState: number | null = null;
  selectedCity: string = '';

  // Limpa formulário e cards
  clear() {
    this.sportControl.setValue(null);
    this.stateControl.setValue(null);
    this.cityControl.setValue('');

    this.sportControl.markAsUntouched();
    this.stateControl.markAsUntouched();
    this.cityControl.markAsUntouched();

    this.loadCardsContent(2);
  }

  // Mensagem de erros - validator
  getErrorMessageSport() {
    return this.sportControl.hasError('required') ? 'Selecione um esporte' : '';
  }

  getErrorMessageState() {
    return this.stateControl.hasError('required') ? 'Selecione um estado' : '';
  }

  getErrorMessageCity() {
    return this.cityControl.hasError('required') ? 'Selecione uma cidade' : '';
  }


  /* --- CARDS EVENTOS --- */

  // Inicia variáveis relacionada aos eventos e paginator - card
  events: Event[] = [];
  displayedEvents: Event[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 3;

  // Carrega eventos na tela
  loadEvents() {
    if (this.stateControl.invalid || this.cityControl.invalid || this.sportControl.invalid) {
      this.sportControl.markAsTouched();
      this.stateControl.markAsTouched();
      this.cityControl.markAsTouched();
    }
    else {
      // Pega eventos do MockService - apenas para desenvolvimento
      this.events = this.mockService.getByCityAndSport(this.selectedCity, this.selectedSport);

      if (this.events.length > 0) {

        this.loadCardsContent(1);

        // Paginator
        const startIndex = this.currentPage * this.itemsPerPage;
        // Cards
        this.displayedEvents = this.events.slice(startIndex, startIndex + this.itemsPerPage);
      }
      else {
        this.loadCardsContent(2);
        this.toast.info('Nenhum evento encontrado com base na sua pesquisa!', 'Busca', { positionClass: 'toast-bottom-center'});
      }
    }
  }

  // Paginator
  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.events.length) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  // Paginator
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
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

  // Carrega ou limpa conteúdo auxiliar - cards e formulário
  loadCardsContent(opt: number) {
      let empty_events = document.querySelector('#ts--empty-events') as HTMLElement;
      let info_events = document.querySelector('#ts--info-events') as HTMLElement;
      let paginator = document.querySelector('#ts--paginator') as HTMLElement;

      if (paginator !== null && info_events !== null && empty_events !== null) {
        // Carrega conteúdo
        if (opt == 1) {
          empty_events.style.display = 'none';
          paginator.style.display = 'flex';
          info_events.style.display = 'block';
        }
        // Limpa a tela
        if (opt == 2) {
          this.events = [];
          this.displayedEvents = [];
          empty_events.style.display = 'block';
          paginator.style.display = 'none';
          info_events.style.display = 'none';
        }
      }
  }
}
