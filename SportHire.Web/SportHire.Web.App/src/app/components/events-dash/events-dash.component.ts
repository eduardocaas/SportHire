import { Component } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

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

}
