import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showContainer = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkRoute();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();
      }
    });
  }

  private checkRoute() {
    this.showContainer = this.router.url === '/';
  }
}
