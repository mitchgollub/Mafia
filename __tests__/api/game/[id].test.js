import GameView from '../../../views/gameView';
import mysqlMock from 'serverless-mysql';
import gameId from '../../../pages/api/game/[id]';
import res from '../../../__mocks__/res';

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

  const expectedResponse = new GameView({ code: 'AAAA', players: [] });

  const response = await gameId(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json).toStrictEqual(expectedResponse);
});

test('Returns 500 on error', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
  };

  mysqlMock.setMockDbResonse({
    error: 'Error',
  });

  const response = await gameId(req, res);

  expect(response.statusCode).toBe(500);
});
