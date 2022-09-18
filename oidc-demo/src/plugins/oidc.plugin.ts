import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { Issuer } from 'openid-client';
import config from '../config';

const oidcPlugin = async (fastify: FastifyInstance) => {
  const keycloakIssuer = await Issuer.discover(config.issuerUrl);

  const client = new keycloakIssuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });

  fastify.decorate('oidc', client);
};

export default fp(oidcPlugin);
