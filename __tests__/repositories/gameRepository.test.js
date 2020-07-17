import GameRepository from '../../repositories/gameRepository';
import MongoDb from '../../lib/mongodb';

jest.mock('../../lib/mongodb');
Math.random = jest.fn(() => 0.48);

describe('GameRepository', () => {
  test('Creates Game', async () => {
    const roles = [
      { role: 'Cop', roleName: 'Cops', startingValue: 1 },
      { role: 'Mafia', roleName: 'Mafia', startingValue: 2 },
      { role: 'Doctor', roleName: 'Doctors', startingValue: 1 },
      { role: 'Town Watch', roleName: 'Town Watch', startingValue: 1 },
      { role: 'Townsfolk', roleName: 'Townsfolk', startingValue: 3 },
    ];

    const actual = await GameRepository.createGame(roles);
    expect(actual).toMatchSnapshot();
  });

  test('Gets Game', async () => {
    const code = 'MMMM';
    MongoDb.findGameDocument.mockResolvedValue({
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
    });

    const actual = await GameRepository.getGame(code);
    expect(actual).toMatchSnapshot();
  });
});
