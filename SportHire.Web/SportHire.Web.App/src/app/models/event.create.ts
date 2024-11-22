import { Sport } from "./enums/sport";
import { UF } from "./enums/uf";

export class EventCreate {

  EmailOwner: string;
  NameOwner: string;
  Sport: Sport;
  Uf?: UF;
  City: string;
  District: string;
  Address: string;
  StartDate: Date;
  Duration: number;
  Observation?: string;

  constructor(
    emailOwner: string,
    nameOwner: string,
    sport: Sport,
    uf: UF,
    city: string,
    district: string,
    address: string,
    startDate: Date,
    duration: number,
    observation: string
  ) {
    this.EmailOwner = emailOwner;
    this.NameOwner = nameOwner;
    this.Sport = sport;
    this.Uf = uf;
    this.City = city,
    this.District = district,
    this.Address = address,
    this.StartDate = startDate,
    this.Duration = duration,
    this.Observation = observation
  }
}
