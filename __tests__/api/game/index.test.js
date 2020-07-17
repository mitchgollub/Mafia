import res from '../../../__mocks__/res';
import game from '../../../pages/api/game/index';
import GameRepository from '../../../repositories/gameRepository';

jest.mock('../../../repositories/gameRepository');

test('Creates Game', async () => {
  GameRepository.createGame.mockResolvedValue({
    code: 'AAAA',
    players: {
      current: [{ id: 1, name: 'YOU', role: 'Narrator', session: '' }],
      available: [],
    },
  });

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 2,
      },
    ],
  };

  const response = await game(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json).toMatchSnapshot();
});

test('Returns 400 when startingValues > 10', async () => {
  GameRepository.createGame.mockResolvedValue({
    code: 'AAAA',
    players: { current: [], available: [] },
  });

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 12,
      },
    ],
  };

  const response = await game(req, res);

  expect(response.statusCode).toBe(400);
});

test('Returns 400 when null startingValues', async () => {
  GameRepository.createGame.mockResolvedValue({
    code: 'AAAA',
    players: { current: [], available: [] },
  });

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: null,
      },
    ],
  };

  const response = await game(req, res);

  expect(response.statusCode).toBe(400);
});

test('Returns 400 when game failed to create', async () => {
  GameRepository.createGame.mockResolvedValue({
    code: 'AAAA',
    players: { current: [], available: [] },
  });

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: null,
      },
    ],
  };

  const response = await game(req, res);

  expect(response.statusCode).toBe(400);
});

test('Returns 500 on error', async () => {
  GameRepository.createGame.mockImplementation(() => {
    throw new Error('Failed to connect');
  });

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 2,
      },
    ],
  };

  const response = await game(req, res);

  expect(response.statusCode).toBe(500);
});
