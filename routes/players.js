import * as playerController from '../controllers/playerController.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';
import { getPlayersSchema, createPlayerSchema } from '../schemas/playerSchemas.js';

export default async function (fastify, opts) {
  fastify.get('/players', {
    preHandler: verifyJWT,
    schema: getPlayersSchema
  }, playerController.getPlayersHandler);
  
  fastify.post('/players', {
    preHandler: verifyJWT,
    schema: createPlayerSchema
  }, playerController.createPlayerHandler);
}
