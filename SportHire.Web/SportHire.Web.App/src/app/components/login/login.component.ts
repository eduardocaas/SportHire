import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credentials';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface AuthResponse {
  email: string;
  token: string;
}

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

  constructor(private service: AuthService, private router: Router, private toast: ToastrService) { }

  login() {
    if (this.emailControl.valid && this.passwordControl.valid) {
      this.service
      .authenticate(this.creds)
      .subscribe({
        next: (response: HttpResponse<AuthResponse>) => {
          const token = response.body?.token;

          if (token) {
            this.service.successfulLogin(token);
            this.router.navigate(['']);
          } else {
            console.error('Authorization header not found');
          }
        },
        error: (err: HttpErrorResponse) => {
          // Exibe um toast de erro caso o status seja 400 ou outro
          if (err.status === 400) {
            this.toast.error('Email ou senha incorretos', 'Autenticação', { positionClass: 'toast-bottom-center' });
          } else {
            this.toast.error('Erro no servidor', 'Erro', { positionClass: 'toast-bottom-center' });
          }
          console.error('Error status:', err.status, 'Message:', err.message);
        }
      });
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
