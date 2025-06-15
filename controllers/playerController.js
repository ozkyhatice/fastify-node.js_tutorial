import * as service from '../services/playerService.js';

export async function getPlayersHandler(req, res) {
  const players = await service.getAllPlayers(req.server.sqlite);
  res.send(players);
}

export async function createPlayerHandler(req, res) {
  const { name, score } = req.body;
  await service.createPlayer(req.server.sqlite, name, score);
  res.code(201).send({ message: 'Player created' });
}
