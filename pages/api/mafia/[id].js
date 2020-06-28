import PlayerRequest from '../../../models/playerRequest';
import PlayerResponse from '../../../models/playerResponse';
import GameRepository from '../../../repositories/gameRepository';
import PlayerRepository from '../../../repositories/playerRepository';

const gameRepository = new GameRepository();
const playerRepository = new PlayerRepository();

const Error = require('../../../lib/error');

export default async (req, res) => {
  try {
    const playerRequest = new PlayerRequest(req.body);
    console.log(`playerRequest: ${JSON.stringify(playerRequest)}`);

    const game = await gameRepository.getFullGame(playerRequest.id);

    if (!game) return Error.BadRequest(res, 'Could not find Game');

    const player = await playerRepository.addPlayer(game, playerRequest);
    res.status(200).json(new PlayerResponse({
      id: playerRequest.id,
      role: player.role,
      description: player.description,
    }));

    return res;
  } catch (error) {
    console.error(error.stack);
    return Error.InternalServerError(res, error);
  }
};
