import { Injectable } from '@angular/core';
import { Sport } from '../models/enums/sport';
import { eventsFindPortoAlegreAberto } from '../mocks/events.mock';
import { IEventService } from './interfaces/i.event.service';
import { Event } from '../models/event';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IEventService {

  constructor(private http: HttpClient) { }

  getByCityAndSport(city: string, sport: Sport | null): Event[] {
    throw new Error('Method not implemented.');
  }

  /*getByCityAndSport(city: string, sport: number | null): Event[] {
    const params = new HttpParams().set('city', city);

    if (sport != Sport.DEFAULT) {
     params.set('sport', sport);
    }
  }*/
}

@Injectable({
  providedIn: 'root'
})
export class MockEventService implements IEventService {

  constructor() { }

  getByCityAndSport(city: string, sport: Sport | null): Event[] {

    if (sport == Sport.DEFAULT) {
      return eventsFindPortoAlegreAberto.filter(e => {
        return e.City == city
      });
    }

    return eventsFindPortoAlegreAberto.filter(e => {
      return e.City == city && e.Sport == sport
    });
  }
}



