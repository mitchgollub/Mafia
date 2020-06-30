import roleDescriptions from '../../../configuration/roleDescriptions.json';
import PlayerView from '../../../views/playerView';

const mockMySql = require('serverless-mysql');
const mafia = require('../../../pages/api/mafia/[id]');
const res = require('../../../__mocks__/res');

beforeEach(() => {
  mockMySql.clearMockDbResponse();
});

test('Creates Player', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      id: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };
  const expected = {
    id: 'AAAA',
    role: 'Cop',
    description: roleDescriptions.Cop,
  };

  mockMySql.setMockDbResonse([
    {
      players: JSON.stringify({ current: [], available: [{ role: 'Cop', id: 1 }] }),
    },
  ]);
  mockMySql.setMockDbResonse([]);

  const actual = await mafia.default(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns Empty when no players available', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      id: 'AAAA',
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

  mockMySql.setMockDbResonse([
    {
      players: JSON.stringify({ current: [], available: [] }),
    },
  ]);

  const actual = await mafia.default(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns existing player when found', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      id: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };
  const currentPlayer = {
    id: 'AAAA',
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

  mockMySql.setMockDbResonse([
    {
      players: JSON.stringify({ current: [currentPlayer], available: [] }),
    },
  ]);

  const actual = await mafia.default(req, res);

  expect(actual.statusCode).toEqual(200);
  expect(actual.json).toEqual(expected);
});

test('Returns 400 when no players available', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      id: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };

  mockMySql.setMockDbResonse({ error: 'Error' });

  const actual = await mafia.default(req, res);

  expect(actual.statusCode).toEqual(400);
});

test('Returns 500 on error', async () => {
  const req = {
    query: {
      id: 'AAAA',
    },
    body: {
      id: 'AAAA',
      name: 'Mitch',
      session: 'guid',
    },
  };

  // Malformed JSON in DB
  mockMySql.setMockDbResonse([
    {
      players: `${JSON.stringify({ current: [], available: [] })}}`,
    },
  ]);

  const actual = await mafia.default(req, res);

  expect(actual.statusCode).toEqual(500);
});
