import * as controller from '../controllers/authController.js';

export default async function (fastify, opts) {
  fastify.post('/register', controller.registerHandler);
  fastify.post('/login', controller.loginHandler);
}
