import GameRepository from '../../../repositories/gameRepository';
import GameView from '../../../views/gameView';
import { NextApiRequest, NextApiResponse } from 'next';
import { BadRequest, InternalServerError } from '../../../lib/error';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GameView | null>,
): Promise<NextApiResponse<GameView | null>> => {
  try {
    console.log(`id: ${req.query.id}`);

    const game = await GameRepository.getGame(req.query.id as string);

    if (!game) {
      return BadRequest(res, 'Could not find Game');
    }

    res.status(200).json(
      new GameView({
        code: game.code,
        players: game.players.current,
      }),
    );

    return res;
  } catch (error) {
    return InternalServerError(res, error);
  }
};
