import GameRepository from '../../../repositories/gameRepository';
import GameView from '../../../views/gameView';
import { NextApiRequest, NextApiResponse } from 'next';

const gameRepository = new GameRepository();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GameView | null>,
): Promise<NextApiResponse<GameView | null>> => {
  console.log(`id: ${req.query.id}`);

  const game = await gameRepository.getGame(req.query.id as string);

  if (game) {
    res.status(200).json(
      new GameView({
        code: game.code,
        players: game.players.current,
      }),
    );
    return res;
  }

  res.status(500);
  return res;
};
