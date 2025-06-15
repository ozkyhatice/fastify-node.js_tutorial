import * as playerController from '../controllers/playerController.js';
import { verifyJWT, validatePlayer } from '../middlewares/verifyJWT.js';

export default async function (fastify, opts) {
  fastify.get('/players', { preHandler: verifyJWT }, playerController.getPlayersHandler);
  fastify.post('/players', { preHandler: [verifyJWT, validatePlayer] }, playerController.createPlayerHandler);
}
