/// <reference path="index.d.ts"/>
import Fastify, { FastifyInstance } from 'fastify';
import oidcPlugin from './plugins/oidc.plugin';
import login from './routes/login';
import user from './routes/user';

const fastify: FastifyInstance = Fastify({ logger: true });

const start = async () => {
  try {
    fastify.register(oidcPlugin);
    fastify.register(login);
    fastify.register(user);
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
