import * as controller from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../schemas/userSchemas.js';

export default async function (fastify, opts) {
  fastify.post('/register', {
    schema: registerSchema
  }, controller.registerHandler);
  
  fastify.post('/login', {
    schema: loginSchema
  }, controller.loginHandler);
}
