const mysqlMock = require('serverless-mysql');
const db = require('../../lib/db');

test('query returns query results', async () => {
  const resp = [
    {
      username: 'Mitch',
      password: 'Monkey123',
    },
  ];

  mysqlMock.setMockDbResonse(resp);

  const actual = await db.query('select username, password from users;');

  expect(actual).toEqual(resp);
});
