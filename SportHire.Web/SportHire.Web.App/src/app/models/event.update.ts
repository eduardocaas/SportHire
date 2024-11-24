export class EventUpdate {

  Id: string;
  District: string;
  Address: string;
  StartDate: Date;
  Duration: number;
  Observation?: string;

  constructor(
    id: string,
    district: string,
    address: string,
    startDate: Date,
    duration: number,
    observation: string
  ) {
    this.Id = id;
    this.District = district;
    this.Address = address;
    this.StartDate = startDate;
    this.Duration = duration;
    this.Observation = observation;
  }
}
