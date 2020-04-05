import Game from '../../../models/game';

const mysqlMock = require('serverless-mysql');
const gameId = require('../../../pages/api/game/[id]');
const res = require('../../../__mocks__/res');

test('Returns Game by Id', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
  };

  mysqlMock.setMockDbResonse([
    {
      players: JSON.stringify({ current: [] }),
    },
  ]);

  const expectedResponse = new Game({ code: 'AAAA', players: [] });

  const response = await gameId.default(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json).toStrictEqual(expectedResponse);
});

test('Returns 500 on error', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
  };

  mysqlMock.setMockDbResonse(
    {
      error: 'Error',
    },
  );

  const response = await gameId.default(req, res);

  expect(response.statusCode).toBe(500);
});
