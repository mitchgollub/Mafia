const db = require('../../../lib/db');
const escape = require('sql-template-strings')

export default async (req, res) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(req.body)
    const config = req.body;

    const cleanedConfig = cleanInput(config);

    const availableString = []
    for (let index = 0; index < cleanedConfig.Cop; index++) {
        availableString.push("Cop")
    }
    for (let index = 0; index < cleanedConfig.Mafia; index++) {
        availableString.push("Mafia")
    }
    for (let index = 0; index < cleanedConfig.Townsfolk; index++) {
        availableString.push("Townsfolk")
    }

    const available = []
    for (let index = 0; index < availableString.length; index++) {
        available.push({ id: index + 2, role: availableString[index] })
    }

    const players = {
        current: [{ id: 1, role: 'Narrator', name: 'YOU' }],
        available: available
    }

    const resp = await db.query(escape`INSERT INTO Games(game_code, players) 
        VALUES(${result}, ${JSON.stringify(players)})`)

    res.status(200).json({ game: { code: result, players: players.current } });
}

function cleanInput(config) {
    config.Cop = cleanNumber(config.Cop);
    config.Mafia = cleanNumber(config.Mafia);
    config.Townsfolk = cleanNumber(config.Townsfolk);
    return config;
}

function cleanNumber(input) {
    if (input) {
        const inputInt = parseInt(input);
        if (inputInt !== NaN && inputInt <= 10 && inputInt > 0) {
            return inputInt;
        }
    }

    return 0;
}
