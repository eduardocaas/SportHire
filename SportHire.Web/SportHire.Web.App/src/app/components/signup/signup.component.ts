import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserSignup } from '../../models/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  hide = true;
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  user: UserSignup = {
    name: '',
    email: '',
    password: ''
  }

  signup() {
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
    return this.passwordControl.hasError('required') ? 'Insira uma senha' : '';
  }

}
