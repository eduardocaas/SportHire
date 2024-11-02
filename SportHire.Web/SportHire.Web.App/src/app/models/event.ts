export interface Event {
  Id?: string;
  Sport: number;
  EmailOwner?: string;
  EmailPlayer?: string;
  Uf?: number;
  City: string;
  District: string;
  Address: string;
  StartDate: Date;
  Duration: number;
  Status?: number;
  Cost: number;
}
