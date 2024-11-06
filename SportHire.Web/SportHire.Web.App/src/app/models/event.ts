export interface Event {
  id?: string;
  sport: number;
  emailOwner?: string;
  emailPlayer?: string;
  uf?: number;
  city: string;
  district: string;
  address: string;
  startDate: Date;
  duration: number;
  status?: number;
  cost: number;
}
