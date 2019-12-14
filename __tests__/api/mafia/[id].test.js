const mafia = require('../../../pages/api/mafia/[id]');
const res = require('../../../__mocks__/res');

test('Creates Player', async () => {
    const req = {
        query: {
            id: 'AAAA'
        },
        body: {
            name: 'Mitch',
            session: 'guid'
        }
    },
        expected = {};

    require('serverless-mysql').__setMockDbResonse([
        {
            players: JSON.stringify({ current: [], available: [] })
        }
    ]);
    require('serverless-mysql').__setMockDbResonse([]);

    const actual = await mafia.default(req, res);

    expect(actual.statusCode).toEqual(200);
    expect(actual.json).toEqual(expected);
});