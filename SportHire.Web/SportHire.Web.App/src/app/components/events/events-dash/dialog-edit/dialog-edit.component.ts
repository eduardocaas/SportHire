import { Component, Inject } from '@angular/core';
import { Event } from '../../../../models/event';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css'
})
export class DialogEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Event) {}

  districtFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required]);
  timeFormControl = new FormControl('', [Validators.required]);
  durationFormControl = new FormControl('', [Validators.required, Validators.min(30), Validators.max(180)]);

  get formattedTime(): string {
    const hours = this.data.startDate.getHours();
    const minutes = this.data.startDate.getMinutes();

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
}
