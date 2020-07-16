import res from '../../../__mocks__/res';
import game from '../../../pages/api/game/index';

test('Creates Game', async () => {
  const gameRepository = {
    createGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: {
        current: [{ id: 1, name: 'YOU', role: 'Narrator', session: '' }],
        available: [],
      },
    }),
  };

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 2,
      },
    ],
  };

  const response = await game(req, res, gameRepository);

  expect(response.statusCode).toBe(200);
  expect(response.json).toMatchSnapshot();
});

test('Returns 400 when startingValues > 10', async () => {
  const gameRepository = {
    createGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: { current: [], available: [] },
    }),
  };

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 12,
      },
    ],
  };

  const response = await game(req, res, gameRepository);

  expect(response.statusCode).toBe(400);
});

test('Returns 400 when null startingValues', async () => {
  const gameRepository = {
    createGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: { current: [], available: [] },
    }),
  };

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: null,
      },
    ],
  };

  const response = await game(req, res, gameRepository);

  expect(response.statusCode).toBe(400);
});

test('Returns 500 on error', async () => {
  const gameRepository = {
    createGame: () => {
      throw new Error('Failed to connect');
    },
  };

  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 2,
      },
    ],
  };

  const response = await game(req, res, gameRepository);

  expect(response.statusCode).toBe(500);
});
