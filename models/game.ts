import AvailableRole from './availableRole';
import Player from './player';

export default class Game {
  constructor({ code, players }: Partial<Game> = {}) {
    this.code = code || '';
    this.players = players || { current: [], available: [] };
  }

  code: string;
  players: PlayerAssignments;
}

interface PlayerAssignments {
  current: Player[];
  available: AvailableRole[];
}
