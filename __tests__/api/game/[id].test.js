import res from '../../../__mocks__/res';
import gameId from '../../../pages/api/game/[id]';
import GameRepository from '../../../repositories/gameRepository';

jest.mock('../../../repositories/gameRepository');

test('Returns Game by Id', async () => {
  GameRepository.getGame.mockResolvedValue({
    code: 'AAAA',
    players: { current: [], available: [] },
  });

  const req = {
    query: {
      id: 'AAAA',
    },
  };

  const response = await gameId(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json).toMatchSnapshot();
});

test('Returns 400 when no game is returned', async () => {
  GameRepository.getGame.mockResolvedValue(null);

  const req = {
    query: {
      id: 'AAAA',
    },
  };

  const response = await gameId(req, res);

  expect(response.statusCode).toBe(400);
});

test('Returns 500 on error', async () => {
  GameRepository.getGame.mockImplementation(() => {
    throw new Error('Failed to connect');
  });

  const req = {
    query: {
      id: 'AAAA',
    },
  };

  const response = await gameId(req, res);

  expect(response.statusCode).toBe(500);
});
