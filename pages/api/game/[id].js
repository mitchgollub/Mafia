import GameRepository from '../../../repositories/gameRepository';
import GameView from '../../../views/gameView';

const gameRepository = new GameRepository();

export default async (req, res) => {
  console.log(`id: ${req.query.id}`);

  const game = await gameRepository.getGame(req.query.id);

  if (game) {
    res.status(200).json(new GameView({
      code: game.code,
      players: game.players.current,
    }));
    return res;
  }

  res.status(500);
  return res;
};
