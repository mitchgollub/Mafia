const db = require('../../../lib/db');
const Error = require ('../../../lib/error');
const escape = require('sql-template-strings')

export default async (req, res) => {

    // TODO: MAKE A FOREIGN KEY ON THIS IDENTIFIER
    var gameCode = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
        gameCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(`request: ${JSON.stringify(req.body)}`)
    const roles = req.body;

    const cleanedRoles = cleanInput(roles);
    const availableString = []
    cleanedRoles.map(role => {
        for (let index = 0; index < role.startingValue; index++) {
            availableString.push(role.role)
        }
    });

    const available = []
    for (let index = 0; index < availableString.length; index++) {
        available.push({ id: index + 2, role: availableString[index] })
    }

    const players = {
        current: [{ id: 1, role: 'Narrator', name: 'YOU' }],
        available: available
    }

    const resp = await db.query(escape`INSERT INTO Games(game_code, players)
        VALUES(${gameCode}, ${JSON.stringify(players)})`)

    if (resp.error) {
      return Error.InternalServerError(res, 'Could not create game')
    }

    res.status(200).json({ game: { code: gameCode, players: players.current } });
}

function cleanInput(roles) {
    return roles.map(role => {
        return {
            role: role.role,
            roleName: role.roleName,
            startingValue: cleanNumber(role.startingValue)
        }
    })
}

function cleanNumber(input) {
    if (input) {
        const inputInt = parseInt(input);
        if (inputInt !== NaN && inputInt <= 10 && inputInt >= 0) {
            return inputInt;
        }
        else {
            console.warn(`value ${inputInt} is not 1-10.  Setting to 0`);
        }
    }
    else {
        console.warn(`startingValue not given.  Setting to 0.`);
    }

    return 0;
}
