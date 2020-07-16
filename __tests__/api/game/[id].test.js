import res from '../../../__mocks__/res';
import gameId from '../../../pages/api/game/[id]';

test('Returns Game by Id', async () => {
  const gameRepository = {
    getGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: { current: [], available: [] },
    }),
  };

  const req = {
    query: {
      id: 'AAAA',
    },
  };

  const response = await gameId(req, res, gameRepository);

  expect(response.statusCode).toBe(200);
  expect(response.json).toMatchSnapshot();
});

test('Returns 400 when no game is returned', async () => {
  const gameRepository = {
    getGame: jest.fn().mockResolvedValue(null),
  };

  const req = {
    query: {
      id: 'AAAA',
    },
  };

  const response = await gameId(req, res, gameRepository);

  expect(response.statusCode).toBe(400);
});

test('Returns 500 on error', async () => {
  const gameRepository = {
    getGame: () => {
      throw new Error('Failed to connect');
    },
  };

  const req = {
    query: {
      id: 'AAAA',
    },
  };

  const response = await gameId(req, res, gameRepository);

  expect(response.statusCode).toBe(500);
});
