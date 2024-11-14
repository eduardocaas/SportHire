import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sport } from '../../../../models/enums/sport';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UF } from '../../../../models/enums/uf';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class DialogCreateComponent {

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

  });

  constructor(private _formBuilder: FormBuilder) {}
}
