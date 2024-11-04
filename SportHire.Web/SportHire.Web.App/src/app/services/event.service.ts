import { Injectable } from '@angular/core';
import { Sport } from '../models/enums/sport';
import { eventsFindPortoAlegreAberto } from '../mocks/events.mock';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class MockEventService {

  constructor() { }

  getByCityAndSport(city: string, sport: Sport | null) {
    return eventsFindPortoAlegreAberto.filter(e => {
      e.City == city && e.Sport == sport
    });
  }
}



