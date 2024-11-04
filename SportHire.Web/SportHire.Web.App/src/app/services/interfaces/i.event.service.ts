import { Sport } from "../../models/enums/sport";

export interface IEventService {
  getByCityAndSport(city: string, sport: Sport | null): Event[];
}
