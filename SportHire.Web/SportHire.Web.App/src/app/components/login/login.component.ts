import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Insira um email';
    }
    if (this.emailControl.hasError('email')) {
      return 'Insira um email válido';
    }
  }
}
