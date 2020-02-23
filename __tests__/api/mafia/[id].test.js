const mafia = require('../../../pages/api/mafia/[id]');
const res = require('../../../__mocks__/res');
const mockMySql = require('serverless-mysql');

import roleDescriptions from '../../../configuration/roleDescriptions.json';

beforeEach(() => {
    mockMySql.__clearMockDbResponse();
})

test('Creates Player', async () => {
    const req = {
        query: {
            id: 'AAAA'
        },
        body: {
            id: 'AAAA',
            name: 'Mitch',
            session: 'guid'
        }
    },
        expected = {
            id: "AAAA",
            role: "Cop",
            description: roleDescriptions['Cop'],
        };

    mockMySql.__setMockDbResonse([
        {
            players: JSON.stringify({ current: [], available: [{ role: 'Cop', id: 1 }] })
        }
    ]);
    mockMySql.__setMockDbResonse([]);

    const actual = await mafia.default(req, res);

    expect(actual.statusCode).toEqual(200);
    expect(actual.json).toEqual(expected);
});

test('Returns \'Empty\' when no players available', async () => {
    const req = {
        query: {
            id: 'AAAA'
        },
        body: {
            id: 'AAAA',
            name: 'Mitch',
            session: 'guid'
        }
    },
        expected = {
            id: "AAAA",
            name: "Mitch",
            role: "Empty",
            session: "guid",
        };

    mockMySql.__setMockDbResonse([
        {
            players: JSON.stringify({ current: [], available: [] })
        }
    ]);

    const actual = await mafia.default(req, res);

    expect(actual.statusCode).toEqual(200);
    expect(actual.json).toEqual(expected);
});