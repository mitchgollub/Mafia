import PlayerRequest from '../../../models/playerRequest';
import PlayerView from '../../../views/playerView';
import GameRepository from '../../../repositories/gameRepository';
import PlayerRepository from '../../../repositories/playerRepository';
import { InternalServerError, BadRequest } from '../../../lib/error';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from '@hapi/joi';

const gameRepository = new GameRepository();
const playerRepository = new PlayerRepository();

const schema = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  session: Joi.string().required(),
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  try {
    console.log(`Request Body: ${JSON.stringify(req.body)}`);

    const { error } = schema.validate(req.body);

    if (error) {
      return BadRequest(res, error.message);
    }

    const playerRequest = new PlayerRequest(req.body);

    const game = await gameRepository.getGame(playerRequest.code);

    if (!game) {
      return BadRequest(res, 'Could not find Game');
    }

    const player = await playerRepository.addPlayer(game, playerRequest);

    res.status(200).json(
      new PlayerView({
        id: playerRequest.code,
        role: player.role,
        description: player.description,
      }),
    );

    return res;
  } catch (error) {
    console.error(error.stack);
    return InternalServerError(res, error);
  }
};
