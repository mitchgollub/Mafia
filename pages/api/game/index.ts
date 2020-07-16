import GameRepository from '../../../repositories/gameRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { BadRequest, InternalServerError } from '../../../lib/error';
import GameView from '../../../views/gameView';
import Joi from '@hapi/joi';

const schema = Joi.array().items(
  Joi.object({
    role: Joi.string().required(),
    roleName: Joi.string().required(),
    startingValue: Joi.number().min(0).max(10).required(),
  }),
);

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GameView | null>,
  gameRepository: GameRepository = new GameRepository(),
): Promise<NextApiResponse> => {
  try {
    console.log(`request: ${JSON.stringify(req.body)}`);

    const { error } = schema.validate(req.body);

    if (error) {
      return BadRequest(res, error.message);
    }

    const game = await gameRepository.createGame(req.body);

    if (!game) {
      return BadRequest(res, 'Could not create game');
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
