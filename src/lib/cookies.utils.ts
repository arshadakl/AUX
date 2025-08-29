import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import 'server-only';

export async function tryGetCookieOrRedirect() {
  const retrievedCookies = await cookies();
  const token = retrievedCookies.get('token')?.value;
  if (!token) {
    redirect('/');
  }
  return token;
}
