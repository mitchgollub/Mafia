import Game from '../models/game';
import AvailableRole from '../models/availableRole';
import GameRequestRole from '../models/gameRequestRole';
import { MongoDb } from '../lib/mongodb';

const client = new MongoDb();

export default class GameRepository {
  createGame = async function createGame(
    roles: GameRequestRole[],
  ): Promise<Game | null> {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i += 1) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const available: AvailableRole[] = [];
    roles.forEach((role) => {
      for (let index = 0; index < role.startingValue; index += 1) {
        available.push(
          new AvailableRole({ id: available.length + 2, role: role.role }),
        );
      }
    });

    const players = {
      current: [{ id: 1, role: 'Narrator', name: 'YOU', session: '' }],
      available,
    };

    const game = new Game({ code, players });

    await client.insertGameDocument(game);

    return game;
  };

  getGame = async function getGame(code: string): Promise<Game | null> {
    return await client.findGameDocument(code);
  };
}
