import GameView from '../../views/gameView';

test('GameView loads w/ default values', async () => {
  const expected = {
    code: '',
    players: [],
  };

  const actual = new GameView();

  expect(actual).toEqual(expected);
});
