import type { BaseClient } from 'openid-client';

declare module 'fastify' {
  interface FastifyInstance {
    oidc: BaseClient
  }
}
