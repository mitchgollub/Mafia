const game_id = require('../../../pages/api/game/[id]');
const res = require('../../../__mocks__/res');

test('Returns Game by Id', async () => {
    const req = {
        query: {
            id: 'AAAA'
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