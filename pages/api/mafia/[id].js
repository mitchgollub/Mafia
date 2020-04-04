const db = require('../../../lib/db');
const Error = require('../../../lib/error');
const escape = require('sql-template-strings');

import roleDescriptions from '../../../configuration/roleDescriptions.json';
import PlayerRequest from '../../../models/playerRequest.js';
import Player from '../../../models/player.js';
import PlayerResponse from '../../../models/playerResponse.js';

export default async (req, res) => {
  try {
    const playerRequest = new PlayerRequest(req.body);
    console.log('playerRequest: ' + JSON.stringify(playerRequest));
    const resp = await db.query(escape`SELECT players FROM Games WHERE game_code = ${playerRequest.id}`)

    if (!resp[0])
      return Error.BadRequest(res, 'Could not find Game')

    const players = JSON.parse(resp[0].players)

    // Check if player's session already exists in case of refresh
    const existingPlayer = players.current.find((player) =>
      player.session === playerRequest.session);

    if (existingPlayer) {
      existingPlayer.description = roleDescriptions[existingPlayer.role];
      res.status(200).json(existingPlayer);
      return res;
    }

    // Check if there are available players
    if (!players.available.length) {
      res.status(200).json(new Player({
        id: playerRequest.id,
        role: 'Empty',
        name: playerRequest.name,
        session: playerRequest.session
      }));
      return res;
    }

    // TODO: USE VERSIONING SYSTEM (OR TRANSACTIONS/RETRIES AND TRY/CATCHES)
    //       TO PREVENT RACE CONDITIONS
    const index = Math.floor(Math.random() * (players.available.length))
    const selected = players.available[index];
    players.available.splice(index, 1);

    players.current.push(new Player({
      id: selected.id,
      role: selected.role,
      name: playerRequest.name,
      session: playerRequest.session
    }));

    const resp2 = await db.query(escape`UPDATE Games SET players=${JSON.stringify(players)} WHERE game_code = ${req.query.id}`)

    res.status(200).json(new PlayerResponse({
      id: playerRequest.id,
      role: selected.role,
      description: roleDescriptions[selected.role]
    }));

    return res;
  }
  catch (error) {
    return Error.InternalServerError(res, error)
  }
}