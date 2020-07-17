import roleDescriptions from '../../../configuration/roleDescriptions.json';
import PlayerView from '../../../views/playerView';
import mafia from '../../../pages/api/mafia/[id]';
import res from '../../../__mocks__/res';
import GameRepository from '../../../repositories/gameRepository';
import PlayerRepository from '../../../repositories/playerRepository';

jest.mock('../../../repositories/gameRepository');
jest.mock('../../../repositories/playerRepository');

test('Creates Player', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      code: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };
  const expected = {
    id: 'AAAA',
    role: 'Cop',
    description: roleDescriptions.Cop,
  };

  GameRepository.getGame.mockResolvedValue({
    code: 'AAAA',
    players: {
      current: [],
      available: [{ role: 'Cop', id: 1 }],
    },
  });

  PlayerRepository.addPlayer.mockResolvedValue({
    role: 'Cop',
    description: roleDescriptions.Cop,
  });

  const actual = await mafia(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns Empty when no players available', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      code: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };
  const expected = new PlayerView({
    id: 'AAAA',
    name: 'Mitch',
    role: 'Empty',
    session: 'guid',
  });

  GameRepository.getGame.mockResolvedValue({
    code: 'AAAA',
    players: {
      current: [],
      available: [],
    },
  });

  PlayerRepository.addPlayer.mockResolvedValue({
    id: -1,
    role: 'Empty',
    name: req.body.name,
    session: req.body.session,
  });

  const actual = await mafia(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns existing player when found', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      code: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };
  const currentPlayer = {
    code: 'AAAA',
    name: 'Mitch',
    role: 'Cop',
    session: 'guid',
    description: roleDescriptions.Cop,
  };

  const expected = new PlayerView({
    id: 'AAAA',
    name: 'Mitch',
    role: 'Cop',
    session: 'guid',
    description: roleDescriptions.Cop,
  });

  GameRepository.getGame.mockResolvedValue({
    code: 'AAAA',
    players: {
      current: [currentPlayer],
      available: [],
    },
  });

  PlayerRepository.addPlayer.mockResolvedValue({
    role: 'Cop',
    description: roleDescriptions.Cop,
  });

  const actual = await mafia(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns 200 when no players available', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      code: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };

  const expected = new PlayerView({
    id: 'AAAA',
    name: 'Mitch',
    role: 'Empty',
    session: 'guid',
  });

  GameRepository.getGame.mockResolvedValue({
    code: 'AAAA',
    players: {
      current: [],
      available: [],
    },
  });

  PlayerRepository.addPlayer.mockResolvedValue({
    role: 'Empty',
  });

  const actual = await mafia(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns 400 when request is invalid', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      name: 'Mitch',
      session: 'guid',
    },
  };

  const response = await mafia(req, res);

  expect(response.statusCode).toBe(400);
});

test("Returns 400 when game can't be found", async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      code: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };

  GameRepository.getGame.mockResolvedValue(null);

  const response = await mafia(req, res);

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
    body: {
      code: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };

  const actual = await mafia(req, res);

  expect(actual.statusCode).toEqual(500);
});
