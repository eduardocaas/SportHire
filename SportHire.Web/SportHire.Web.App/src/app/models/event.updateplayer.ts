export class EventUpdatePlayer {

  NamePlayer: string;
  EmailPlayer: string;

  constructor(
    namePlayer: string,
    emailPlayer: string
  ) {
    this.NamePlayer = namePlayer;
    this.EmailPlayer = emailPlayer;
  }
}
