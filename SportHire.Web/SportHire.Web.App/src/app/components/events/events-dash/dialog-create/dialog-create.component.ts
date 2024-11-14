import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sport } from '../../../../models/enums/sport';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UF } from '../../../../models/enums/uf';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-br'
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ]
})
export class DialogCreateComponent {

  constructor(private _formBuilder: FormBuilder, private _dateAdapter: DateAdapter<Date>) {
    this._dateAdapter.setLocale('pt-br');
  }

  sports = [
    { opt: Sport.FUTEBOL, name: 'Futebol' },
    { opt: Sport.VOLEI_PRAIA, name: 'Vôlei de Praia' },
    { opt: Sport.BASQUETE, name: 'Basquete' }
  ];

  states = [
    { uf: UF.RS, name: 'Rio Grande do Sul' },
    { uf: UF.SP, name: 'São Paulo' }
  ];

  cities = [
    { name: 'Porto Alegre', uf: UF.RS },
    { name: 'Canoas', uf: UF.RS },
    { name: 'São Paulo', uf: UF.SP },
    { name: 'Campinas', uf: UF.SP }
  ];

  selectedSport: number | null = null;
  selectedState: number | null = null;
  selectedCity: string = '';
  inputDistrict: string = '';
  inputAddress: string = '';
  inputDate: string = '';
  inputTime: string = '';
  inputDuration: number | null = null;
  inputObservation: string = '';

  sportFormGroup = this._formBuilder.group({
    sportCtrl: ['', Validators.required],
  });

  locationFormGroup = this._formBuilder.group({
    stateCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    districtCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required]
  });

  dateFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
    timeCtrl: ['', Validators.required],
    durationCtrl: ['', [Validators.required, Validators.min(30), Validators.max(180)]]
  });

  doneFormGroup = this._formBuilder.group({
    observationCtrl: ['', Validators.required]
  })
}
