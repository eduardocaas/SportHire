import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfile } from '../../../../models/enums/profile';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {

  event: Event;
  profile: UserProfile;

  isChecked = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: Event, profile: UserProfile }) {
    this.event = data.event;
    this.profile = data.profile;
  }
}
