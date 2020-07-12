import Player from '../models/player';

export default class GameView {
  constructor({ code, players }: GameView = {}) {
    this.code = code || '';
    this.players = Array.isArray(players) ? players : [];
  }

  code?: string;
  players?: Player[];
}
