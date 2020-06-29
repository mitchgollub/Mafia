export default class Game {
  constructor({ code, players } = {}) {
    this.code = code || '';
    this.players = players || { current: [], available: [] };
  }
}
