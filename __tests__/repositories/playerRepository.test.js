import PlayerRepository from '../../repositories/playerRepository';

jest.mock('../../lib/mongodb');
Math.random = jest.fn(() => 0.48);

describe('PlayerRepository', () => {
  test('Adds Player', async () => {
    const game = {
      code: 'MMMM',
      players: {
        current: [{ id: 1, role: 'Narrator', name: 'YOU', session: '' }],
        available: [
          { id: 2, role: 'Cop' },
          { id: 3, role: 'Mafia' },
          { id: 4, role: 'Mafia' },
          { id: 5, role: 'Doctor' },
          { id: 6, role: 'Town Watch' },
          { id: 7, role: 'Townsfolk' },
          { id: 8, role: 'Townsfolk' },
          { id: 9, role: 'Townsfolk' },
        ],
      },
    };

    const playerRequest = {
      code: 'MMMM',
      name: 'Mitch',
      session: '0000-0000',
    };

    const actual = await PlayerRepository.addPlayer(game, playerRequest);
    expect(actual).toMatchSnapshot();
  });

  test('Adds Player Returns Existing Player', async () => {
    const game = {
      code: 'MMMM',
      players: {
        current: [
          { id: 1, role: 'Narrator', name: 'YOU', session: '' },
          {
            description: 'Doctors have ...',
            id: 5,
            name: 'Mitch',
            role: 'Doctor',
            session: '0000-0000',
          },
        ],
        available: [
          { id: 2, role: 'Cop' },
          { id: 3, role: 'Mafia' },
          { id: 4, role: 'Mafia' },
          { id: 6, role: 'Town Watch' },
          { id: 7, role: 'Townsfolk' },
          { id: 8, role: 'Townsfolk' },
          { id: 9, role: 'Townsfolk' },
        ],
      },
    };

    const playerRequest = {
      code: 'MMMM',
      name: 'Mitch',
      session: '0000-0000',
    };

    const actual = await PlayerRepository.addPlayer(game, playerRequest);
    expect(actual).toMatchSnapshot();
  });

  test('Adds Player Returns Empty Player if none available', async () => {
    const game = {
      code: 'MMMM',
      players: {
        current: [{ id: 1, role: 'Narrator', name: 'YOU', session: '' }],
        available: [],
      },
    };

    const playerRequest = {
      code: 'MMMM',
      name: 'Mitch',
      session: '0000-0000',
    };

    const actual = await PlayerRepository.addPlayer(game, playerRequest);
    expect(actual).toMatchSnapshot();
  });
});
