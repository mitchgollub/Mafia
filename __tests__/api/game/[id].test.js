const game_id = require('../../../pages/api/game/[id]');

test('Returns Game by Id', async () => {
    const req = {
        query: {
            id: 'AAAA'
        }
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
            query: (query) => [
                {
                    players: JSON.stringify({ current: [] } )
                }
            ]
        },
        escape = (text) => text,
        expectedResponse = { game: { code: "AAAA", players: [] } };

    const response = await game_id.getGameById(req, res, db, escape);
    
    expect(response.statusCode).toBe(200);
    expect(response.json).toStrictEqual(expectedResponse);
});