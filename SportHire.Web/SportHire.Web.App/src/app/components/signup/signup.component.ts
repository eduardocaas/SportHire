import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserSignup } from '../../models/signup';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  hide = true;
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).+$') ]);

  user: UserSignup = {
    fullname: '',
    email: '',
    password: ''
  }

  constructor(
    private readonly _service: SignupService,
    private readonly _router: Router,
    private readonly _toast: ToastrService) { }

  signup() {
    if (this.nameControl.valid && this.emailControl.valid && this.passwordControl.valid) {
      console.log(this.user);

      this._service
      .signup(this.user)
      .subscribe({
        next: (response) => {
          this._toast.success('Usuário registrado com sucesso', 'Cadastro', { timeOut: 1000 });
          timer(1000).subscribe(x => { this._router.navigate(['login']); })
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this._toast.error('Email já cadastrado no sistema', 'Cadastro');
          } else {
            this._toast.error('Erro no servidor', 'Erro');
          }
          console.error('Error status:', err.status, 'Message:', err.message);
        }
      });
    }
    else {
      this._toast.error('Campos inválidos', 'Cadastro');
    }
  }

  passwordCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Mínimo uma letra minúscula
      const hasLowerCase = /[a-z]/.test(value);
      // Mínimo uma letra maiúscula
      const hasUpperCase = /[A-Z]/.test(value);

      if (!hasLowerCase || !hasUpperCase) {
        return { 'passwordStrength': true }; // Retorna o erro
      }

      return null; // Senha válida
    };
  }

  // TODO: Adicionar Regex para caracteres especiais e maxLength
  getErrorMessageName() {
    return this.nameControl.hasError('required') ? 'Insira um nome' : '';
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Insira um email';
    }

    return this.emailControl.hasError('email') ? 'Insira um email válido' : '';
  }

  getErrorMessagePwd() {
    console.log('passwordControl.errors:', this.passwordControl.errors);
    if (this.passwordControl.hasError('required')) {
      return 'Insira uma senha';
    }
    if (this.passwordControl.hasError('minlength')) {
      return 'A senha deve conter no mínimo 8 caracteres';
    }
    if (this.passwordControl.hasError('maxlength')) {
      return 'A senha deve conter no máximo 20 caracteres';
    }
    if (this.passwordControl.hasError('pattern')) {
      return 'Requisitos: letra minúscula, maiúscula, número e caractere especial';
    }
    return '';
  }

}
