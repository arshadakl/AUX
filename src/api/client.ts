import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './schema';
import { Env } from '@/lib/Env';

const client = createFetchClient<paths>({
  baseUrl: Env.NEXT_PUBLIC_BACKEND_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

const $api = createClient(client);
export { $api, client };
