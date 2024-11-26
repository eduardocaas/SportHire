import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Event as RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UrlService } from './services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Correção: `styleUrl` -> `styleUrls` no decorator
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    private readonly urlService: UrlService
  ) { }

  title = 'SportHire.Web.App';

  previousUrl: string | null = null;
  currentUrl: string | null = null;

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const previousUrl = this.currentUrl; // Salva a URL atual como anterior
        this.currentUrl = event.url; // Atualiza a URL atual
        if (previousUrl) {
          this.urlService.setPreviousUrl(previousUrl); // Atualiza a URL anterior no serviço
        }
      });
    }
}
