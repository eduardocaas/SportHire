import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private _router: Router, private _authService: AuthService, private _toast: ToastrService) { }

  logout() {
    this._authService.logout();
    this._router.navigate(['login']);
    this._toast.info('Deslogado com sucesso' , 'Logout' , { timeOut: 3000, positionClass: 'toast-top-left' });
  }
}
