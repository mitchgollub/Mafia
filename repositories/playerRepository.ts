import escape from 'sql-template-strings';
import Player from '../models/player';
import roleDescriptions from '../configuration/roleDescriptions.json';
import { query } from '../lib/db';
import Game from '../models/game';
import PlayerRequest from '../models/playerRequest';

export default class PlayerRepository {
  addPlayer = async function addPlayer(
    game: Game,
    playerRequest: PlayerRequest,
  ): Promise<Player> {
    const { code, players } = game;

    // Check if player's session already exists in case of refresh
    const existingPlayer = players.current.find(
      (player) => player.session === playerRequest.session,
    );

    if (existingPlayer) {
      existingPlayer.description =
        roleDescriptions[existingPlayer.role as keyof typeof roleDescriptions];
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
    const index = Math.floor(Math.random() * players.available.length);
    const selected = players.available[index];
    players.available.splice(index, 1);

    const newPlayer = new Player({
      id: selected.id,
      role: selected.role,
      name: playerRequest.name,
      session: playerRequest.session,
    });

    players.current.push(newPlayer);

    await query(
      escape`UPDATE Games SET players=${JSON.stringify(
        players,
      )} WHERE game_code = ${code}`,
    );

    // Description does not need to be stored in db
    newPlayer.description = roleDescriptions[selected.role];

    return newPlayer;
  };
}
