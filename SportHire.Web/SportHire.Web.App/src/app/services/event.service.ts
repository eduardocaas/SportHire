import { Injectable } from '@angular/core';
import { Sport } from '../models/enums/sport';
import { eventsDashUserAbertoAndamento, eventsDashUserCanceladoFinalizado, eventsFindPortoAlegreAberto } from '../mocks/events.mock';
import { IEventService } from './interfaces/i.event.service';
import { Event } from '../models/event';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EVENTS_CONFIG, JWT } from '../configs/api.config';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IEventService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getByCityAndSport(city: string, sport: Sport | null): Observable<Event[]> {

    const email = this.authService.getEmail();
    const emailParam = email ? email : '';

    const params = new HttpParams()
      .set('city', city)
      .set('sport', sport && sport !== Sport.DEFAULT ? sport : Sport.DEFAULT)
      .set('email', emailParam);

    // Apenas para desenvolvimento
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);

    (sport != Sport.DEFAULT && sport != null) ? params.set('sport', sport) : params.set('sport', Sport.DEFAULT);

    return this.http.get<Event[]>(EVENTS_CONFIG.localUrl, { params, headers });
  }

  getInProgressByEmailOwner(emailOwner: string): Observable<Event[]> {
    throw new Error('Method not implemented.');
  }

  getFinishedByEmailOwner(emailOwner: string): Observable<Event[]> {
    throw new Error('Method not implemented.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockEventService implements IEventService {

  constructor() { }

  getByCityAndSport(city: string, sport: Sport | null): Observable<Event[]> {

    if (sport == Sport.DEFAULT) {
      return of(eventsFindPortoAlegreAberto.filter(e => {
        return e.city == city
      }));
    }

    return of(eventsFindPortoAlegreAberto.filter(e => {
      return e.city == city && e.sport == sport
    }));
  }

  getInProgressByEmailOwner(emailOwner: string): Observable<Event[]> {
    return of(eventsDashUserAbertoAndamento.filter(e => {
      return e.emailOwner == emailOwner
    }));
  }

  getFinishedByEmailOwner(emailOwner: string): Observable<Event[]> {
    return of(eventsDashUserCanceladoFinalizado.filter(e => {
      return e.emailOwner == emailOwner
    }));
  }
}



