import express from 'express';
import * as functions from 'firebase-functions';
import next from 'next';
import cors from 'cors';
import { addSpotifyPlaylistHandler, spotifyCallbackHandler } from './handler';
import { createDominantColorHandler } from './lib/firestore';

const server = express();
const nextjsServer = next({
  conf: { distDir: 'lib/next' },
});
const nextjsHandle = nextjsServer.getRequestHandler();
server.use(cors());

server.get('/callback', spotifyCallbackHandler);
server.all('/**', (req, res, next) => {
  nextjsServer
    .prepare()
    .then(() => nextjsHandle(req, res))
    .then(next);
});

export const app = functions.https.onRequest(server);
export const saveSpotifyPlaylist = functions.https.onCall(addSpotifyPlaylistHandler);
export const createDominantColor = functions.firestore
  .document('Albums/{album_id}')
  .onCreate(createDominantColorHandler);
