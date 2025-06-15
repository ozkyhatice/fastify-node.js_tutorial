import Fastify from 'fastify';
import dbPlugin from './plugins/db.js';
import playerRoutes from './routes/players.js';
import authRoutes from './routes/auth.js';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

const fastify = Fastify({ logger: true });

await fastify.register(swagger, {
  swagger: {
    info: {
      title: 'Fastify API',
      version: '1.0.0'
    }
  }
});

await fastify.register(swaggerUI, { routePrefix: '/docs' });
await fastify.register(dbPlugin);
await fastify.register(authRoutes);
await fastify.register(playerRoutes);

const start = async () => {
    try{
        await fastify.listen({port:3000})
        fastify.log.info('Server is running on port 3000')
    }catch(err){
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
