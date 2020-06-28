import GameRepository from '../../../repositories/gameRepository';

const gameRepository = new GameRepository();

export default async (req, res) => {
  console.log(`id: ${req.query.id}`);

  const game = await gameRepository.getGame(req.query.id);

  if (game) {
    res.status(200).json(game);
    return res;
  }

  res.status(500);
  return res;
};
