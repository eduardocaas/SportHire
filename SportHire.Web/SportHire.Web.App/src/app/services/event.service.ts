import { Injectable } from '@angular/core';
import { Sport } from '../models/enums/sport';
import { eventsFindPortoAlegreAberto } from '../mocks/events.mock';
import { IEventService } from './interfaces/i.event.service';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IEventService {

  constructor() { }

  getByCityAndSport(city: string, sport: Sport | null): Event[] {
    throw new Error('Method not implemented.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockEventService implements IEventService {

  constructor() { }

  getByCityAndSport(city: string, sport: Sport | null): Event[] {
    return eventsFindPortoAlegreAberto.filter(e => {
      return e.City == city && e.Sport == sport
    });
  }
}



