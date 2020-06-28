import Player from '../models/player';
import roleDescriptions from '../configuration/roleDescriptions.json';

const escape = require('sql-template-strings');
const db = require('../lib/db');

export default class PlayerRepository {
  constructor() {
    this.addPlayer = async function addPlayer(game, playerRequest) {
      const { code, players } = game;

      // Check if player's session already exists in case of refresh
      const existingPlayer = players.current
        .find((player) => player.session === playerRequest.session);

      if (existingPlayer) {
        existingPlayer.description = roleDescriptions[existingPlayer.role];
        existingPlayer.name = playerRequest.name;
        existingPlayer.session = playerRequest.session;
        return existingPlayer;
      }

      // Check if there are available players
      if (!players.available.length) {
        return new Player({
          id: playerRequest.id,
          role: 'Empty',
          name: playerRequest.name,
          session: playerRequest.session,
        });
      }

      // TODO: USE VERSIONING SYSTEM (OR TRANSACTIONS/RETRIES AND TRY/CATCHES)
      //       TO PREVENT RACE CONDITIONS
      const index = Math.floor(Math.random() * (players.available.length));
      const selected = players.available[index];
      players.available.splice(index, 1);

      const newPlayer = new Player({
        id: selected.id,
        role: selected.role,
        name: playerRequest.name,
        session: playerRequest.session,
      });

      players.current.push(newPlayer);

      await db.query(escape`UPDATE Games SET players=${JSON.stringify(players)} WHERE game_code = ${code}`);

      return {
        description: roleDescriptions[selected.role],
        ...newPlayer,
      };
    };
  }
}
