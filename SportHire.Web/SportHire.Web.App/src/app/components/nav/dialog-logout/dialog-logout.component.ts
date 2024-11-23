import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrl: './dialog-logout.component.css'
})
export class DialogLogoutComponent {

  constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _toast: ToastrService) {}

  logout() {
    this._authService.logout();
    this._router.navigate(['login']);
    this._toast.info('Deslogado com sucesso' , 'Logout' , { timeOut: 3000, positionClass: 'toast-top-left' });
  }
}
