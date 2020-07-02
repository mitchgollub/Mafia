import GameRepository from '../../../repositories/gameRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { BadRequest } from '../../../lib/error';
import GameView from '../../../views/gameView';


const gameRepository = new GameRepository();

export default async (req: NextApiRequest, res: NextApiResponse<GameView | null>): Promise<NextApiResponse> => {
  console.log(`request: ${JSON.stringify(req.body)}`);
  const game = await gameRepository.createGame(req.body);

  if (!game) {
    return BadRequest(res, 'Could not create game');
  }

  res.status(200).json(new GameView({
    code: game.code,
    players: game.players.current
  }));
  return res;
};
