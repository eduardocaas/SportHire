export interface Event {
  Id?: string;
  Sport: number;
  EmailOwner?: string;
  EmailPlayer?: string;
  Uf?: number;
  City: string;
  Address: string;
  StartDate: Date;
  Duration: number;
  Status?: number;
  Cost: number;
}
