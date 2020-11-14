import express from 'express';
import * as functions from 'firebase-functions';
import next from 'next';

import { spotifyCallbackHandler } from './handler';

const server = express();
const nextjsServer = next({
  conf: { distDir: 'lib/next' },
});
const nextjsHandle = nextjsServer.getRequestHandler();

server.get('/callback', spotifyCallbackHandler);

server.all('/**', (req, res, next) => {
  nextjsServer
    .prepare()
    .then(() => nextjsHandle(req, res))
    .then(next);
});

export const app = functions.https.onRequest(server);
