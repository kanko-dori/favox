import * as functions from 'firebase-functions';
import next from 'next';

const nextjsServer = next({
  conf: {
    distDir: 'lib/next',
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const nextApp = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
