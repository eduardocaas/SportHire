import { Observable } from "rxjs";
import { Sport } from "../../models/enums/sport";
import { Event } from "../../models/event";
import { EventCreate } from "../../models/event.create";

export interface IEventService {
  getByCityAndSport(city: string, sport: Sport | null): Observable<Event[]>;
  getByEmailOwner(opt: number): Observable<Event[]>;
  getInProgressByEmailOwner(emailOwner: string): Observable<Event[]>;
  getFinishedByEmailOwner(emailOwner: string): Observable<Event[]>;
  create(event: EventCreate): Observable<void>;
}
