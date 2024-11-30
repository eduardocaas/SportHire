export interface Event {
  id?: string;
  sport: number;
  emailOwner: string;
  emailPlayer?: string;
  nameOwner: string;
  namePlayer?: string;
  uf?: number;
  city: string;
  district: string;
  address: string;
  startDate: Date;
  duration: number;
  status?: number;
  cost: number;
  observation?: string;
  confirmPlayer: boolean;
  confirmOwner: boolean;
}
