/**
 * his file is used for managing environment variables in the project.
 * Add the env here also with validation
 * Make sure all these requred variables are present in the .env file
 * Dont use process.env directly from the project use this ENV constant instead
 */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  // Add all client side env variables here
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string().optional(),
  },
  // Add all shared env variables here
  shared: {
  },
  // Add all server side env variables
  server: {
    GOOGLE_APPS_SCRIPT_URL: z.string().url().optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_APP_URL,
    GOOGLE_APPS_SCRIPT_URL: process.env.GOOGLE_APPS_SCRIPT_URL,
  },
});
