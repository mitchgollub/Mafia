export default class GameView {
  constructor({ code, players } = {}) {
    this.code = code || '';
    this.players = Array.isArray(players) ? players : [];
  }
}
