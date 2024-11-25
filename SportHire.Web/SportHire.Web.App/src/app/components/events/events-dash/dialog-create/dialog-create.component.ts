import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sport } from '../../../../models/enums/sport';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UF } from '../../../../models/enums/uf';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { EventCreate } from '../../../../models/event.create';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _dateAdapter: DateAdapter<Date>,
    private _service: EventService,
    private _toast: ToastrService,
    private _router: Router)
  {
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

  payStatus = false;

  markAsPaid() {
    if (!this.payStatus) {
      this.payStatus = true;
    }
  }

  event: EventCreate =
  {
    EmailOwner: '',
    NameOwner: '',
    Sport: Sport.DEFAULT,
    Uf: undefined,
    City: '',
    District: '',
    Address: '',
    StartDate: new Date(),
    Duration: 0,
    Observation: ''
  }

  inputDate: string = '';
  inputTime: string = '';

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

  dateBuilder() {
    const date = new Date(this.inputDate);

    const hour = parseInt(this.inputTime.substring(0, 2), 10);
    const minute = parseInt(this.inputTime.substring(2, 4), 10);

    date.setHours(hour);
    date.setMinutes(minute);

    return date;
  }

  create() {
    this.event.StartDate = this.dateBuilder();

    this._service.create(this.event).subscribe(response => {
      this._toast.success('Evento cadastrado com sucesso!', 'Evento', { positionClass: 'toast-bottom-center' });
      timer(1000).subscribe(x => { window.location.reload(); })

    }, err => {
      if (err.error.errors) {
        err.error.errors.forEach((e: { message: string | undefined; }) => {
          this._toast.error(e.message, 'Erro ao evento', { positionClass: 'toast-bottom-center' });
        });
      }
      else {
        this._toast.error(err.error.message, 'Erro ao criar', { positionClass: 'toast-bottom-center' });
      }
    })
  }
}
