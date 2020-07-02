import mysqlMock from 'serverless-mysql';
import game from '../../../pages/api/game/index';
import res from '../../../__mocks__/res';

test('Creates Game', async () => {
  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 2,
      },
    ],
  };

  mysqlMock.setMockDbResonse([]);

  const response = await game(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json.code).toEqual(expect.stringMatching('^[^s]{4}$'));
  expect(response.json.players).toEqual([
    { id: 1, name: 'YOU', role: 'Narrator' },
  ]);
});

test('Handles startingValues > 10', async () => {
  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 12,
      },
    ],
  };

  mysqlMock.setMockDbResonse([]);

  const response = await game(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json.code).toEqual(expect.stringMatching('^[^s]{4}$'));
  expect(response.json.players).toEqual([
    { id: 1, name: 'YOU', role: 'Narrator' },
  ]);
});

test('Handles null startingValues', async () => {
  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: null,
      },
    ],
  };

  mysqlMock.setMockDbResonse([]);

  const response = await game(req, res);

  expect(response.statusCode).toBe(200);
  expect(response.json.code).toEqual(expect.stringMatching('^[^s]{4}$'));
  expect(response.json.players).toEqual([
    { id: 1, name: 'YOU', role: 'Narrator' },
  ]);
});

test('Returns 400 on error', async () => {
  const req = {
    body: [
      {
        role: 'Cop',
        roleName: 'Cops',
        startingValue: 2,
      },
    ],
  };

  mysqlMock.setMockDbResonse({ error: 'Error' });

  const response = await game(req, res);

  expect(response.statusCode).toBe(400);
});
