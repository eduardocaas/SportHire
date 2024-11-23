import { Component } from '@angular/core';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(public dialog: MatDialog) { }

  openLogoutDialog() {
    this.dialog.open(DialogLogoutComponent, {
        scrollStrategy: new NoopScrollStrategy()
    });
  }
}
