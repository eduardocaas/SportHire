import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide = true;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  creds: Credentials = {
    email: '',
    password: ''
  }

  constructor(private service: AuthService, private router: Router) { }

  login() {
    if (this.emailControl.valid && this.passwordControl.valid) {
      this.service
      .authenticate(this.creds)
      .subscribe({
        next: (response) => {
          response.headers.get('Authorization')?.substring(7);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
        }
      }); // TODO: Toast (else) para campos inválidos.
    }
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Insira um email';
    }

    return this.emailControl.hasError('email') ? 'Insira um email válido' : '';
  }

  getErrorMessagePwd() {
    return this.passwordControl.hasError('required') ? 'Insira uma senha' : '';
  }


}
