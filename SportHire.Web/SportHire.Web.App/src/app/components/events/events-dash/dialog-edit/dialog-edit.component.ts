import { Component, Inject } from '@angular/core';
import { Event } from '../../../../models/event';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css'
})
export class DialogEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Event) {}
}
