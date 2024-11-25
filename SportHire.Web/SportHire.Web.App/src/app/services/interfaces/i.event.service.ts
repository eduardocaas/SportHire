import { Observable } from "rxjs";
import { Sport } from "../../models/enums/sport";
import { Event } from "../../models/event";
import { EventCreate } from "../../models/event.create";
import { EventUpdate } from "../../models/event.update";

export interface IEventService {
  getByCityAndSport(city: string, sport: Sport | null): Observable<Event[]>;
  getByEmailOwner(opt: number): Observable<Event[]>;
  getInProgressByEmailOwner(emailOwner: string): Observable<Event[]>;
  getFinishedByEmailOwner(emailOwner: string): Observable<Event[]>;
  create(event: EventCreate): Observable<void>;
  update(id: string, event: EventUpdate): Observable<void>;
}
