import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance, _options: unknown, done: Function) {
  fastify.addHook('preHandler', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      reply.code(401);
      reply.send({ error: 'Unauthorized' });
    }

    const tokenDetails = await fastify.oidc.introspect(token as string);
    if (!tokenDetails.active) {
      reply.code(401);
      reply.send({ error: 'Unauthorized' });
    }
  });

  fastify.get('/me', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');
    const userDetails = await fastify.oidc.userinfo(token as string);
    reply.send(userDetails);
  });

  done();
}
