import { Sport } from "../../models/enums/sport";
import { Event } from "../../models/event";

export interface IEventService {
  getByCityAndSport(city: string, sport: Sport | null): Event[];
}
