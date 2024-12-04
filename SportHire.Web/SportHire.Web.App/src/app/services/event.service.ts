import { Injectable } from '@angular/core';
import { Sport } from '../models/enums/sport';
import { eventsDashUserAbertoAndamento, eventsDashUserCanceladoFinalizado, eventsFindPortoAlegreAberto } from '../mocks/events.mock';
import { IEventService } from './interfaces/i.event.service';
import { Event } from '../models/event';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EVENTS_CONFIG, JWT } from '../configs/api.config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Status } from '../models/enums/status';
import { EventCreate } from '../models/event.create';
import { EventUpdate } from '../models/event.update';
import { EventUpdatePlayer } from '../models/event.updateplayer';
import { UserProfile } from '../models/enums/profile';

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

  getByEmailOwner(opt: number): Observable<Event[]> {
    const email = this.authService.getEmail();
    const emailParam = email ? email : '';

    const params = new HttpParams()
      .set('emailOwner', emailParam)
      .set('emailPlayer', 'null');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);
    /* return this.http.get<Event[]>(`${EVENTS_CONFIG.localUrl}/dash`, { params, headers }); */

    return this.http.get<Event[]>(`${EVENTS_CONFIG.localUrl}/dash`, { params, headers }).pipe(
      map(events => {
        if (opt == 1) {
          return events.filter(event => event.status == Status.ANDAMENTO || event.status == Status.ABERTO);
        } else if (opt == 2) {
          return events.filter(event => event.status == Status.CONCLUIDO || event.status == Status.CANCELADO);
        } else {
          return events;
        }
      })
    );
  }

  getByEmailPlayer(opt: number): Observable<Event[]> {
    const email = this.authService.getEmail();
    const emailParam = email ? email : '';

    const params = new HttpParams()
      .set('emailOwner', 'null')
      .set('emailPlayer', emailParam);


    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);
    /* return this.http.get<Event[]>(`${EVENTS_CONFIG.localUrl}/dash`, { params, headers }); */

    return this.http.get<Event[]>(`${EVENTS_CONFIG.localUrl}/dash`, { params, headers }).pipe(
      map(events => {
        if (opt == 1) {
          return events.filter(event => event.status == Status.ANDAMENTO);
        } else if (opt == 2) {
          return events.filter(event => event.status == Status.CONCLUIDO || event.status == Status.CANCELADO);
        } else {
          return events;
        }
      })
    );
  }

  getInProgressByEmailOwner(emailOwner: string): Observable<Event[]> {
    throw new Error('Method not implemented.');
  }

  getFinishedByEmailOwner(emailOwner: string): Observable<Event[]> {
    throw new Error('Method not implemented.');
  }

  create(event: EventCreate): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);

    event.EmailOwner = this.authService.getEmail() ?? '';
    event.NameOwner = this.authService.getName() ?? '';

    return this.http.post<void>(EVENTS_CONFIG.localUrl, event, { headers });
  }

  update(id: string, event: EventUpdate): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);

    return this.http.put<void>(`${EVENTS_CONFIG.localUrl}/${id}`, event, { headers });
  }

  cancel(id: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);

    return this.http.delete<void>(`${EVENTS_CONFIG.localUrl}/${id}`, { headers });
  }

  updatePlayer(id: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ this.authService.getToken() }`);

    const name = this.authService.getName() ?? '';
    const email = this.authService.getEmail() ?? '';

    let event: EventUpdatePlayer = new EventUpdatePlayer(name, email);

    return this.http.put<void>(`${EVENTS_CONFIG.localUrl}/hire/${id}`, event, { headers });
  }

  confirm(id: string, profile: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);

    return this.http.put<any>(`${EVENTS_CONFIG.localUrl}/confirm/${id}/${profile}`, { headers });
  }

  quit(id: string, profile: UserProfile): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);

    return this.http.put<any>(`${EVENTS_CONFIG.localUrl}/quit/${id}/${profile}`, { headers });
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

  getByEmailOwner(opt: number): Observable<Event[]> {
    throw new Error('Method not implemented.');
  }

  getByEmailPlayer(opt: number): Observable<Event[]> {
    throw new Error('Method not implemented.');
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

  create(event: EventCreate): Observable<void> {
    throw new Error('Method not implemented.');
  }

  update(id: string, event: EventUpdate): Observable<void> {
    throw new Error('Method not implemented.');
  }

  cancel(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  updatePlayer(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  confirm(id: string, profile: UserProfile): Observable<string> {
    throw new Error('Method not implemented.');
  }

  quit(id: string, profile: UserProfile): Observable<any> {
    throw new Error('Method not implemented.');
  }
}



