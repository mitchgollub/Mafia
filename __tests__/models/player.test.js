import Player from '../../models/player';

test('Player loads w/ required values', async () => {
  const expected = {
    id: 'id',
    role: 'Doctor',
    name: 'Mitch',
  };

  const actual = new Player(expected);

  expect(actual).toEqual(expected);
});

test('Player loads w/ all values', async () => {
  const expected = {
    id: 'id',
    role: 'Doctor',
    name: 'Mitch',
    session: 'guid',
    description: 'A doctor helps people',
  };

  const actual = new Player(expected);

  expect(actual).toEqual(expected);
});
