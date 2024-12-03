import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

  previousUrl: string = '';

  constructor(
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.selectedOption = 1 }

  ngOnInit() {
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl || ''; // Atualiza a URL anterior quando disponível
      if (this.previousUrl == "/events/find") {
        this.selectedOption = 1;
      } else {
        this.selectedOption = 2;
      }
    });
  }

  selectedOption: number | null = null;

  changeProfile(opt: number) {
    this.selectedOption = opt == 1 ? 1 : 2;
  }

}
