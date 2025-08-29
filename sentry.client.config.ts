// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import * as Spotlight from '@spotlightjs/spotlight';


if(process.env.NODE_ENV=='production'){
  Sentry.init({
    dsn:process.env.NEXT_PUBLIC_SENTRY_DSN,
    beforeSend(event){
      // skips the next js fallback erros
      if(event.exception?.values?.[0]?.value === 'NEXT_HTTP_ERROR_FALLBACK;401') {
        return null;
      }
      return event
    },
    ignoreErrors:['NEXT_HTTP_ERROR_FALLBACK;401'],
  
    // Add optional integrations for additional features
    integrations: [
      Sentry.replayIntegration(),
    ],
  
    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,
  
    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,
  
    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,
  
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
/** FIXME: spotlight config for development */
// if (process.env.NODE_ENV === 'development') {
//   Spotlight.init();
// }
