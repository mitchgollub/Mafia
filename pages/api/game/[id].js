const db = require('../../../lib/db');
const escape = require('sql-template-strings')

export default async (req, res) => {
    console.log('id: ' + req.query.id)
    const resp = await db.query(escape`SELECT players FROM Games WHERE game_code = ${req.query.id}`)
    console.log(resp)
    if (resp && resp.length) {
        const players = JSON.parse(resp[0].players);
        res.status(200).json({ game: { code: req.query.id, players: players.current } });
    }
    
    res.status(500)
}