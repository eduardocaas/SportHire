export interface Event {
  id?: string;
  sport: number;
  status?: number;
  nameOwner: string;
  emailOwner: string;
  namePlayer?: string;
  emailPlayer?: string;
  uf?: number;
  city: string;
  district: string;
  address: string;
  startDate: Date;
  duration: number;
  cost: number;
  observation?: string;
  confirmPlayer: boolean;
  confirmOwner: boolean;
  playerChangeAttempts: number;
}
