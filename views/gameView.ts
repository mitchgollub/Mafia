import CurrentRole from '../models/currentRole';

export default class GameView {
  constructor({ code, players }: GameView = {}) {
    this.code = code || '';
    this.players = Array.isArray(players) ? players : [];
  }

  code?: string;
  players?: CurrentRole[];
}
