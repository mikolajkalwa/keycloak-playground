import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { z } from 'zod';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

const Config = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  issuerUrl: z.string().url(),
});

const config = Config.parse({
  clientId: process.env['CLIENT_ID'],
  clientSecret: process.env['CLIENT_SECRET'],
  issuerUrl: process.env['ISSUER_URL'],
});

export default config;
