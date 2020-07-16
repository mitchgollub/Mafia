import roleDescriptions from '../../../configuration/roleDescriptions.json';
import PlayerView from '../../../views/playerView';
import mafia from '../../../pages/api/mafia/[id]';
import res from '../../../__mocks__/res';

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

  const gameRepository = {
    getGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: {
        current: [],
        available: [{ role: 'Cop', id: 1 }],
      },
    }),
  };

  const playerRepository = {
    addPlayer: jest.fn().mockResolvedValue({
      role: 'Cop',
      description: roleDescriptions.Cop,
    }),
  };

  const actual = await mafia(req, res, gameRepository, playerRepository);

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

  const gameRepository = {
    getGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: {
        current: [],
        available: [],
      },
    }),
  };

  const playerRepository = {
    addPlayer: jest.fn().mockResolvedValue({
      id: -1,
      role: 'Empty',
      name: req.body.name,
      session: req.body.session,
    }),
  };

  const actual = await mafia(req, res, gameRepository, playerRepository);

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

  const gameRepository = {
    getGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: {
        current: [currentPlayer],
        available: [],
      },
    }),
  };

  const playerRepository = {
    addPlayer: jest.fn().mockResolvedValue({
      role: 'Cop',
      description: roleDescriptions.Cop,
    }),
  };

  const actual = await mafia(req, res, gameRepository, playerRepository);

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

  const gameRepository = {
    getGame: jest.fn().mockResolvedValue({
      code: 'AAAA',
      players: {
        current: [],
        available: [],
      },
    }),
  };

  const playerRepository = {
    addPlayer: jest.fn().mockResolvedValue({
      role: 'Empty',
    }),
  };

  const actual = await mafia(req, res, gameRepository, playerRepository);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns 500 on error', async () => {
  const gameRepository = {
    getGame: () => {
      throw new Error('Failed to connect');
    },
  };
  const playerRepository = {};

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

  const actual = await mafia(req, res, gameRepository, playerRepository);

  expect(actual.statusCode).toEqual(500);
});
