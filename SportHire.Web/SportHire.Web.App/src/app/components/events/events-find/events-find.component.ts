import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { UF } from '../../../models/enums/uf';
import { Sport } from '../../../models/enums/sport';

@Component({
  selector: 'app-events-find',
  templateUrl: './events-find.component.html',
  styleUrl: './events-find.component.css'
})
export class EventsFindComponent {

  /* --- FORMULÁRIO DE BUSCA --- */

  sportControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

  sports = [
    { opt: Sport.FUTEBOL, name: 'Futebol' },
    { opt: Sport.VOLEI_PRAIA, name: 'Vôlei de Praia' },
    { opt: Sport.BASQUETE, name: 'Basquete' }
  ]

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

  cities = [
    { name: 'Porto Alegre', uf: UF.RS },
    { name: 'Canoas', uf: UF.RS },
    { name: 'São Paulo', uf: UF.SP },
    { name: 'Campinas', uf: UF.SP }
  ];

  selectedSport: number | null = null
  selectedState: number | null = null;
  selectedCity: string = '';

  find() {
    if (this.stateControl.invalid || this.cityControl.invalid || this.sportControl.invalid) {
      this.sportControl.markAsTouched();
      this.stateControl.markAsTouched();
      this.cityControl.markAsTouched();
    }
  }

  clear() {
    this.sportControl.setValue(null);
    this.stateControl.setValue(null);
    this.cityControl.setValue('');

    this.sportControl.markAsUntouched();
    this.stateControl.markAsUntouched();
    this.cityControl.markAsUntouched();
  }

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


}
