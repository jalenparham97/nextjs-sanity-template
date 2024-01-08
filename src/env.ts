import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    SANITY_API_READ_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_TITLE: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_PROJECT_TITLE:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  },
});
