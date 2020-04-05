export default class Game {
  constructor({ code, players } = {}) {
    this.code = code || '';
    this.players = Array.isArray(players) ? players : [];
  }
}
