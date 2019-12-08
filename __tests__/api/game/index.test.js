const game = require('../../../pages/api/game/index');

test('Creates Game', async () => {
    const req = {
        body: [
            {
                role: "Cop",
                roleName: "Cops",
                startingValue: 2
            }
        ]
    },
        res = {
            statusCode: 0,
            json: {},
            status: function (statusCode) {
                this.statusCode = statusCode
                return {
                    json: (object) => {
                        this.json = object
                    }
                }
            }
        },
        db = {
            query: (query) => []
        },
        escape = (text) => text;

    const response = await game.createGame(req, res, db, null, escape);
    
    expect(response.statusCode).toBe(200);
    expect(response.json.game.code).toEqual(expect.stringMatching("^[^\s]{4}$"));
    expect(response.json.game.players).toEqual([{id: 1, name: "YOU", role: "Narrator"}]);
});