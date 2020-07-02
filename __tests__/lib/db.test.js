import mysqlMock from 'serverless-mysql';
import { query } from '../../lib/db';

test('query returns query results', async () => {
  const resp = [
    {
      username: 'Mitch',
      password: 'Monkey123',
    },
  ];

  mysqlMock.setMockDbResonse(resp);

  const actual = await query('select username, password from users;');

  expect(actual).toEqual(resp);
});
