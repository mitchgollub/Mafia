import Game from '../models/game';
import Role from '../models/role';
import { query } from '../lib/db';
import escape from 'sql-template-strings';
import AvailableRole from '../models/availableRole';

function cleanNumber(input: number): number {
  if (input && Number.isInteger(input) && input <= 10 && input >= 0) {
    return input;
  } else {
    console.warn('startingValue not given.  Setting to 0.');
  }

  return 0;
}

function cleanInput(roles: Role[]): Role[] {
  return roles.map((role) => ({
    role: role.role,
    roleName: role.roleName,
    startingValue: cleanNumber(role.startingValue),
  }));
}

export default class GameRepository {
  createGame = async function createGame(roles: Role[]): Promise<Game | null> {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i += 1) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const cleanedRoles = cleanInput(roles);
    const available: AvailableRole[] = [];
    cleanedRoles.forEach((role) => {
      for (let index = 0; index < role.startingValue; index += 1) {
        available.push(
          new AvailableRole({ id: available.length + 2, role: role.role }),
        );
      }
    });

    const players = {
      current: [{ id: 1, role: 'Narrator', name: 'YOU' }],
      available,
    };

    const resp = await query(escape`INSERT INTO Games(game_code, players)
        VALUES(${code}, ${JSON.stringify(players)})`);

    if (!resp) {
      return null;
    }

    return new Game({ code, players });
  };

  getGame = async function getGame(code: string): Promise<Game | null> {
    const resp = await query(
      escape`SELECT players FROM Games WHERE game_code = ${code}`,
    );
    console.log(resp);
    if (resp && resp.length && resp[0] && resp[0].players) {
      const players = JSON.parse(resp[0].players);
      return new Game({ code, players });
    }

    return null;
  };
}
