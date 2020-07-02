import PlayerRequest from '../../../models/playerRequest';
import PlayerView from '../../../views/playerView';
import GameRepository from '../../../repositories/gameRepository';
import PlayerRepository from '../../../repositories/playerRepository';
import { InternalServerError, BadRequest } from '../../../lib/error';
import { NextApiRequest, NextApiResponse } from 'next';

const gameRepository = new GameRepository();
const playerRepository = new PlayerRepository();


export default async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> => {
  try {
    const playerRequest = new PlayerRequest(req.body);
    console.log(`playerRequest: ${JSON.stringify(playerRequest)}`);

    const game = await gameRepository.getGame(playerRequest.id);

    if (!game) return BadRequest(res, 'Could not find Game');

    const player = await playerRepository.addPlayer(game, playerRequest);

    res.status(200).json(new PlayerView({
      id: playerRequest.id,
      role: player.role,
      description: player.description,
    }));

    return res;
  } catch (error) {
    console.error(error.stack);
    return InternalServerError(res, error);
  }
};
