import { Observable } from "rxjs";
import { Sport } from "../../models/enums/sport";
import { Event } from "../../models/event";
import { EventCreate } from "../../models/event.create";
import { EventUpdate } from "../../models/event.update";
import { EventUpdatePlayer } from "../../models/event.updateplayer";

export interface IEventService {
  getByCityAndSport(city: string, sport: Sport | null): Observable<Event[]>;
  getByEmailOwner(opt: number): Observable<Event[]>;
  getByEmailPlayer(opt: number): Observable<Event[]>;
  getInProgressByEmailOwner(emailOwner: string): Observable<Event[]>;
  getFinishedByEmailOwner(emailOwner: string): Observable<Event[]>;
  create(event: EventCreate): Observable<void>;
  update(id: string, event: EventUpdate): Observable<void>;
  cancel(id: string): Observable<void>;
  updatePlayer(id: string): Observable<void>;
}
