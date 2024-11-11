import { Component } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Status } from '../../../models/enums/status';

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


  status = [
    { opt: Status.ABERTO, name: 'Aberto' },
    { opt: Status.ANDAMENTO, name: 'Andamento' }
  ];

  selectedStatus: number | null = null;
}
