const db = require('../../../lib/db');
const escape = require('sql-template-strings')

export default async (req, res) => {
    console.log('id: ' + req.query.id);
    console.log('name: ' + req.body.name);
    console.log('session: ' + req.body.session);
    const resp = await db.query(escape`SELECT players FROM Games WHERE game_code = ${req.query.id}`)

    if (resp.error) {
        res.status(500).json({
            message: "Failed to connect to database",
            error: `${resp.error}`
        })
        return;
    }

    const players = JSON.parse(resp[0].players)

    // Check if player's session already exists in case of refresh
    const existingPlayer = players.current.find((player) =>
        player.session === req.body.session);

    if (existingPlayer) {
        res.status(200).json(existingPlayer);
        return;
    }

    // Check if there are available players
    if (!players.available.length) {
        res.status(200).json({id: req.query.id, role: 'Empty', name: req.body.name, session: req.body.session});
        return;
    }

    // TODO: USE VERSIONING SYSTEM (OR TRANSACTIONS/RETRIES AND TRY/CATCHES)
    //       TO PREVENT RACE CONDITIONS
    const index = Math.floor(Math.random() * (players.available.length))
    const selected = players.available[index]
    players.available.splice(index, 1);
    players.current.push({ id: selected.id, role: selected.role, name: req.body.name, session: req.body.session });

    const resp2 = await db.query(escape`UPDATE Games SET players=${JSON.stringify(players)} WHERE game_code = ${req.query.id}`)

    res.status(200).json({ id: req.query.id, role: selected.role });

}