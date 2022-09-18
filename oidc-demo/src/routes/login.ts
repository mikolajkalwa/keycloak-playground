import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  totp: z.string().optional(),
});

type UserType = z.infer<typeof UserSchema>;

export default function (fastify: FastifyInstance, _options: unknown, done: Function) {
  fastify.post<{ Body: UserType }>('/login', {
    schema: {
      body: UserSchema,
    },
    validatorCompiler: () => function (data: unknown) {
      try {
        const result = UserSchema.parse(data);
        return { value: result };
      } catch (e: any) {
        return { error: e };
      }
    },
  }, async (request) => {
    const result = await fastify.oidc.grant({
      grant_type: 'password',
      username: request.body.username,
      password: request.body.password,
      totp: request.body.totp,
    });
    return { access_token: result.access_token };
  });

  done();
}
