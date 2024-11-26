import { Component, OnInit } from '@angular/core';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public href: string = "";
  public btn_text: string = "";

  constructor(
    public dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Inicializa a URL no momento da criação do componente
    this.href = this._router.url;
    this.updateButtonText(); // Define o texto do botão na inicialização

    // Observa mudanças na rota e atualiza href e btn_text
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.href = event.urlAfterRedirects;
        this.updateButtonText();
      });
  }

  /**
   * Atualiza o texto do botão com base na URL atual.
   */
  private updateButtonText(): void {
    if (this.href === '/events/dash' || this.href === '/events/dash?opt=1') {
      this.btn_text = 'QUERO JOGAR';
    } else if (this.href === '/events/find') {
      this.btn_text = 'QUERO ALUGAR';
    } else {
      this.btn_text = ''; // Valor padrão ou vazio
    }
  }

  /**
   * Redireciona entre "events/dash" e "events/find" ao clicar no botão.
   */
  onButtonClick(): void {
    if (this.href === '/events/dash' || this.href === '/events/dash?opt=1') {
      this._router.navigate(['/events/find']);
    } else if (this.href === '/events/find') {
      this._router.navigate(['/events/dash']);
    }
  }

  openDashPlayer(): void {
    this._router.navigate(['/events/dash'], { queryParams: { opt: 1 }});
  }

  openLogoutDialog(): void {
    this.dialog.open(DialogLogoutComponent, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }
}
