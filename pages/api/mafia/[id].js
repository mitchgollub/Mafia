const db = require('../../../lib/db');
const Error = require('../../../lib/error');
const escape = require('sql-template-strings');

import roleDescriptions from '../../../configuration/roleDescriptions.json';

export default async (req, res) => {
  try {
    console.log('id: ' + req.query.id);
    console.log('name: ' + req.body.name);
    console.log('session: ' + req.body.session);
    const resp = await db.query(escape`SELECT players FROM Games WHERE game_code = ${req.query.id}`)

    if (!resp[0])
      return Error.InternalServerError(res, 'Could not find Game')

    const players = JSON.parse(resp[0].players)

    // Check if player's session already exists in case of refresh
    const existingPlayer = players.current.find((player) =>
      player.session === req.body.session);

    if (existingPlayer) {
      existingPlayer.description = roleDescriptions[existingPlayer.role];
      res.status(200).json(existingPlayer);
      return res;
    }

    // Check if there are available players
    if (!players.available.length) {
      res.status(200).json({ id: req.query.id, role: 'Empty', name: req.body.name, session: req.body.session });
      return res;
    }

    // TODO: USE VERSIONING SYSTEM (OR TRANSACTIONS/RETRIES AND TRY/CATCHES)
    //       TO PREVENT RACE CONDITIONS
    const index = Math.floor(Math.random() * (players.available.length))
    const selected = players.available[index];
    players.available.splice(index, 1);

    players.current.push({
    
      id: selected.id,
      role: selected.role,
      name: req.body.name,
      session: req.body.session
    });

    const resp2 = await db.query(escape`UPDATE Games SET players=${JSON.stringify(players)} WHERE game_code = ${req.query.id}`)

    res.status(200).json({
      id: req.query.id,
      role: selected.role,
      description: roleDescriptions[selected.role]
    });

    return res;
  }
  catch (error) {
    return Error.InternalServerError(res, error)
  }
}