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
        };


    require('serverless-mysql').__setMockDbResonse([
        {
            players: JSON.stringify({ current: [] })
        }
    ]);

    expectedResponse = { game: { code: "AAAA", players: [] } };

    const response = await game_id.default(req, res);

    expect(response.statusCode).toBe(200);
    expect(response.json).toStrictEqual(expectedResponse);
});