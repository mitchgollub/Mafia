import Player from "./player";
import AvailableRole from "./availableRole";
import CurrentRole from "./currentRole";

export default class Game {
  constructor({ code, players }: Partial<Game> = {}) {
    this.code = code || '';
    this.players = players || { current: [], available: [] };
  }

  code: string;
  players: PlayerAssignments;

}

interface PlayerAssignments {
  current: CurrentRole[];
  available: AvailableRole[];
}
