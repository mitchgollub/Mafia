const db = require('../../../lib/db');
const escape = require('sql-template-strings')

export default async (req, res) => {
    console.log('id: ' + req.query.id);
    console.log('name: ' + req.body.name);
    const resp = await db.query(escape`SELECT players FROM Games WHERE game_code = ${req.query.id}`)

    const players = JSON.parse(resp[0].players)

    // TODO: CHECK IF PLAYER'S NAME ALREADY EXISTS IN CASE OF REFRESH
    // TODO: USE VERSIONING SYSTEM TO PREVENT RACE CONDITIONS

    const index = Math.floor(Math.random() * (players.available.length))
    const selected = players.available[index]
    players.available.splice(index, 1);
    players.current.push({id: selected.id, role: selected.role, name: req.body.name});

    const resp2 = await db.query(escape`UPDATE Games SET players=${JSON.stringify(players)} WHERE game_code = ${req.query.id}`)

    res.status(200).json({id: req.query.id, character: selected.role});
}