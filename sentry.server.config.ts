// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
if(process.env.NODE_ENV=='production'){
  Sentry.init({
    dsn:     process.env.NEXT_PUBLIC_SENTRY_DSN,
    beforeSend(event){
      // skips the next js fallback erros
      if(event.exception?.values?.[0]?.value === 'NEXT_HTTP_ERROR_FALLBACK;401') {
        return null;
      }
      return event
    },
    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}