import GameRepository from '../../../repositories/gameRepository';

const Error = require('../../../lib/error');

const gameRepository = new GameRepository();

export default async (req, res) => {
  console.log(`request: ${JSON.stringify(req.body)}`);
  const game = await gameRepository.createGame(req.body);

  if (!game) {
    return Error.InternalServerError(res, 'Could not create game');
  }

  res.status(200).json(game);
  return res;
};
