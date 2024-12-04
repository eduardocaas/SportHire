import { Component, Inject } from '@angular/core';
import { Event } from '../../../../models/event';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EventService } from '../../../../services/event.service';
import { EventUpdate } from '../../../../models/event.update';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { WalletService } from '../../../../services/wallet.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css',
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
export class DialogEditComponent {

  eventForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private _walletService: WalletService,
    private _dateAdapter: DateAdapter<Date>,
    private readonly _service: EventService,
    private readonly _toast: ToastrService)
  {
    this._dateAdapter.setLocale('pt-br');
    this.eventForm = new FormGroup({
      id: new FormControl(this.data.id),
      district: new FormControl(this.data.district, Validators.required),
      address: new FormControl(this.data.address, Validators.required),
      observation: new FormControl(this.data.observation),
      duration: new FormControl(this.data.duration, [Validators.required, Validators.min(30), Validators.max(180)]),
      time: new FormControl(this.formattedTime, Validators.required),
      date: new FormControl(this.data.startDate, Validators.required)
    });
  }

  get isFormValid() {
    return this.eventForm.valid;
  }

  get formattedTime(): string {
    const startDate = this.data.startDate instanceof Date ? this.data.startDate : new Date(this.data.startDate);

    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();

    return `${hours}${minutes < 10 ? '0' + minutes : minutes}`;
  }

  inputDate: string = this.data.startDate.toString();
  inputTime: string = this.formattedTime;

  dateBuilder(dateEvent: Date, time: string) {
    const date = new Date(dateEvent);

    const hour = parseInt(time.substring(0, 2), 10);
    const minute = parseInt(time.substring(2, 4), 10);

    date.setHours(hour);
    date.setMinutes(minute);

    return date;
  }

  update() {

    if(this.isFormValid) {

      const updatedFormValues = this.eventForm.value;

      const eventUpdate = new EventUpdate(
        this.data.id!,
        updatedFormValues.district,
        updatedFormValues.address,
        this.dateBuilder(updatedFormValues.date, updatedFormValues.time),
        updatedFormValues.duration,
        updatedFormValues.observation
      );

      if (this.checkFields(eventUpdate)) {
        this._toast.info('Você não realizou nenhuma alteração', 'Atualização', { positionClass: 'toast-bottom-center' });
      }
      else {
        this._service.update(this.data.id!, eventUpdate).subscribe(response => {
          this._toast.success('Evento atualizado com sucesso!', 'Evento', { positionClass: 'toast-bottom-center' });
          timer(1000).subscribe(x => { window.location.reload(); })
        }, err => {
          if (err.status == 404) {
            this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
          }
          else if (err.error.errors) {
            err.error.errors.forEach((e: { message: string | undefined; }) => {
              this._toast.error(e.message, 'Erro ao atualizar', { positionClass: 'toast-bottom-center' });
            });
          }
          else {
            console.log(err.status);

            this._toast.error(err.error.message, 'Erro ao atualizar', { positionClass: 'toast-bottom-center' });
          }
        });
      }
    }
    else {
      this._toast.error('Preencha os campos obrigatórios!', 'Formulário', { positionClass: 'toast-bottom-center' });
    }
  }

  checkFields(event: EventUpdate): boolean {
    var dateEvent: string = this.data.startDate.toString();

    if (event.District == this.data.district &&
       event.Address == this.data.address &&
       event.StartDate.toISOString().slice(0, 19) == dateEvent.slice(0, 19) &&
       event.Duration == this.data.duration &&
       event.Observation == this.data.observation)
       {
          return true;
       }
    return false;
  }


  isChecked = false;

  checkEndDate(event: Event): boolean {

    let dateNow: Date = new Date();
    let endDate = new Date(event.startDate);
    endDate.setMinutes(endDate.getMinutes() + event.duration);

    if (endDate <= dateNow) {
      return true;
    }
    return false;
  }

  cancel() {
    this._service.cancel(this.data.id!).subscribe(response => {
      if (this.data.status == 2) {
        this.payment();
        this._toast.success('Evento cancelado com sucesso!', 'Evento', { positionClass: 'toast-bottom-center' });
        timer(2000).subscribe(x => { window.location.reload(); })
      }
      else {
        this.payment();
        this._toast.success('Evento cancelado com sucesso!', 'Evento', { positionClass: 'toast-bottom-center' });
        timer(2000).subscribe(x => { window.location.reload(); })
      }
    }, err => {
      if (err.status == 404) {
        this._toast.error('Evento não encontrado', 'Erro', { positionClass: 'toast-bottom-center' });
      }
      else if (err.error.errors) {
        err.error.errors.forEach((e: { message: string | undefined; }) => {
          this._toast.error(e.message, 'Erro ao cancelar', { positionClass: 'toast-bottom-center' });
        });
      }
      else {
        console.log(err.status);

        this._toast.error(err.error.message, 'Erro ao cancelar', { positionClass: 'toast-bottom-center' });
      }
    });
  }

  payment() {
    this._walletService.deposit(this.data.cost).subscribe({
      next: (response) => {
        console.log(response);
    },
    error: (err) => {
      console.error('Erro na requisição:', err); // Log
      if (err.status === 404) {
        this._toast.error('Usuário ou carteira não encontrados', 'Erro', { positionClass: 'toast-bottom-center' });
      }
      else if(err.status == 400) {
        this._toast.error(err.error.message, 'Erro ao pagar', { positionClass: 'toast-bottom-center' });
      }
      else if (err.error?.message) {
        this._toast.error(err.error.message, 'Erro ao pagar', { positionClass: 'toast-bottom-center' });
      } else {
        console.log(err.status);
        this._toast.error('Erro ao pagar', 'Erro', { positionClass: 'toast-bottom-center' });
      }
    }
    })
  }
}
