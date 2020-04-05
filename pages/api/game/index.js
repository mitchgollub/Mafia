import Game from '../../../models/game';

const escape = require('sql-template-strings');
const db = require('../../../lib/db');
const Error = require('../../../lib/error');

function cleanNumber(input) {
  if (input) {
    const inputInt = parseInt(input, 10);
    if (!Number.isNaN(inputInt) && inputInt <= 10 && inputInt >= 0) {
      return inputInt;
    }

    console.warn(`value ${inputInt} is not 1-10.  Setting to 0`);
  } else {
    console.warn('startingValue not given.  Setting to 0.');
  }

  return 0;
}

function cleanInput(roles) {
  return roles.map((role) => ({
    role: role.role,
    roleName: role.roleName,
    startingValue: cleanNumber(role.startingValue),
  }));
}

export default async (req, res) => {
  let gameCode = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i += 1) {
    gameCode += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(`request: ${JSON.stringify(req.body)}`);
  const roles = req.body;

  const cleanedRoles = cleanInput(roles);
  const availableString = [];
  cleanedRoles.forEach((role) => {
    for (let index = 0; index < role.startingValue; index += 1) {
      availableString.push(role.role);
    }
  });

  const available = [];
  for (let index = 0; index < availableString.length; index += 1) {
    available.push({ id: index + 2, role: availableString[index] });
  }

  const players = {
    current: [{ id: 1, role: 'Narrator', name: 'YOU' }],
    available,
  };

  const resp = await db.query(escape`INSERT INTO Games(game_code, players)
        VALUES(${gameCode}, ${JSON.stringify(players)})`);

  if (resp.error) {
    return Error.InternalServerError(res, 'Could not create game');
  }

  res.status(200).json(new Game({ code: gameCode, players: players.current }));
  return res;
};
