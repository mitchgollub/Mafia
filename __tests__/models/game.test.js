import Game from '../../models/game';

test('Game loads w/ default values', async () => {
  const expected = {
    code: '',
    players: [],
  };

  const actual = new Game();

  expect(actual).toEqual(expected);
});
